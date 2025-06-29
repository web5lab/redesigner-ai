import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../../schemas/index.js';

const router = express.Router();

// Verify wallet signature
const verifySignature = (message, signature, walletAddress) => {
  try {
    // Create hash of the message
    const messageHash = crypto.createHash('sha256').update(message).digest('hex');
    
    // For demo purposes, we'll do basic validation
    // In production, you'd use proper signature verification
    if (!signature || signature.length < 10) {
      return false;
    }
    
    // Check if message contains the wallet address
    if (!message.includes(walletAddress)) {
      return false;
    }
    
    // Check if timestamp is recent (within 5 minutes)
    const timestampMatch = message.match(/Timestamp: (\d+)/);
    if (timestampMatch) {
      const timestamp = parseInt(timestampMatch[1]);
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      if (now - timestamp > fiveMinutes) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};
// Connect wallet and create/login user
router.post('/connect-wallet', async (req, res) => {
  try {
    const { walletAddress, signature, message, timestamp, walletProvider, network, referralCode } = req.body;

    if (!walletAddress || !signature || !message) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address, signature, and message are required'
      });
    }

    // Verify the signature
    const isValidSignature = verifySignature(message, signature, walletAddress);
    if (!isValidSignature) {
      return res.status(401).json({
        success: false,
        message: 'Invalid signature or expired message'
      });
    }

    // Find existing user or create new one
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (!user) {
      user = new User({
        walletAddress: walletAddress.toLowerCase(),
        walletProvider: walletProvider || 'metamask',
        network: network || 'BSC',
        tokenBalances: {
          bnb: '0',
          usdt: '0',
          xxxhub: '1000' // Give new users some tokens
        }
      });
      await user.save();
    } else {
      // Update last login
      user.lastLoginDate = new Date();
      user.lastActivityDate = new Date();
      await user.save();
    }

    // Process referral if provided
    let referralProcessed = false;
    let referralReward = null;
    
    if (referralCode && user.referredBy === null) {
      try {
        // Find referrer by code
        const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
        
        if (referrer && referrer._id.toString() !== user._id.toString()) {
          // Create referral relationship
          const { ReferralSystem } = await import('../../schemas/index.js');
          
          // Check if referral already exists
          const existingReferral = await ReferralSystem.findOne({
            referrerId: referrer._id,
            referredId: user._id
          });
          
          if (!existingReferral) {
            // Create new referral
            const referral = new ReferralSystem({
              referrerId: referrer._id,
              referrerAddress: referrer.walletAddress,
              referralCode: referralCode.toUpperCase(),
              referredId: user._id,
              referredAddress: user.walletAddress,
              status: 'active', // Auto-activate for demo
              ipAddress: req.ip || '127.0.0.1',
              userAgent: req.headers['user-agent'] || 'Unknown'
            });
            
            await referral.save();
            
            // Update user referral info
            user.referredBy = referrer._id;
            
            // Give referred user bonus
            const referredBonus = 100; // 100 XXX tokens
            const currentBalance = parseFloat(user.tokenBalances.xxxhub);
            user.tokenBalances.xxxhub = (currentBalance + referredBonus).toString();
            user.currentTickets += 3; // 3 free tickets
            
            await user.save();
            
            // Update referrer stats
            referrer.totalReferrals += 1;
            
            // Give referrer bonus
            const referrerBonus = 200; // 200 XXX tokens
            const referrerBalance = parseFloat(referrer.tokenBalances.xxxhub);
            referrer.tokenBalances.xxxhub = (referrerBalance + referrerBonus).toString();
            referrer.currentTickets += 5; // 5 free tickets
            referrer.referralRewardsEarned += referrerBonus;
            
            await referrer.save();
            
            referralProcessed = true;
            referralReward = {
              tokens: referredBonus,
              tickets: 3,
              referrerAddress: referrer.walletAddress
            };
          }
        }
      } catch (referralError) {
        console.error('Referral processing error:', referralError);
        // Don't fail the authentication if referral processing fails
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: referralProcessed 
        ? 'Wallet connected successfully! Referral bonus applied.' 
        : 'Wallet connected successfully',
      data: {
        user: {
          id: user._id,
          walletAddress: user.walletAddress,
          walletProvider: user.walletProvider,
          network: user.network,
          totalSpins: user.totalSpins,
          totalWinnings: user.totalWinnings,
          totalSpent: user.totalSpent,
          currentTickets: user.currentTickets,
          tokenBalances: user.tokenBalances,
          referralCode: user.referralCode,
          isVip: user.isVip,
          joinDate: user.joinDate,
          lastLoginDate: user.lastLoginDate
        },
        token,
        referralProcessed,
        referralReward
      }
    });
  } catch (error) {
    console.error('Connect wallet error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          walletAddress: user.walletAddress,
          walletProvider: user.walletProvider,
          network: user.network,
          totalSpins: user.totalSpins,
          totalWinnings: user.totalWinnings,
          totalSpent: user.totalSpent,
          currentTickets: user.currentTickets,
          tokenBalances: user.tokenBalances,
          referralCode: user.referralCode,
          isVip: user.isVip,
          joinDate: user.joinDate,
          lastLoginDate: user.lastLoginDate
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
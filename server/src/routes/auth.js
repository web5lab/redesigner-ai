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
    const { walletAddress, signature, message, timestamp, walletProvider, network } = req.body;

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

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Wallet connected successfully',
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
        token
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
import express from 'express';
import jwt from 'jsonwebtoken';
import { User, ReferralSystem } from '../../schemas/index.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Get referral stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get referrals where this user is the referrer
    const referrals = await ReferralSystem.find({ referrerId: userId });
    
    const totalReferrals = referrals.length;
    const completedReferrals = referrals.filter(r => r.status === 'completed' || r.status === 'active').length;
    const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
    const totalRewardsEarned = referrals
      .filter(r => r.rewardStatus.referrerClaimed)
      .reduce((sum, r) => sum + r.rewards.referrer.tokens, 0);

    res.json({
      success: true,
      data: {
        totalReferrals,
        completedReferrals,
        pendingReferrals,
        totalRewardsEarned,
        referralCode: user.referralCode,
        referralLink: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/ref/${user.referralCode}`
      }
    });
  } catch (error) {
    console.error('Get referral stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get referral history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const referrals = await ReferralSystem.find({ referrerId: userId })
      .populate('referredId', 'walletAddress joinDate')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        referrals: referrals.map(ref => ({
          id: ref._id,
          referredAddress: ref.referredAddress,
          status: ref.status,
          rewardClaimed: ref.rewardStatus.referrerClaimed,
          createdAt: ref.createdAt,
          completedAt: ref.completedAt
        }))
      }
    });
  } catch (error) {
    console.error('Get referral history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create referral (when someone uses referral code)
router.post('/create', async (req, res) => {
  try {
    const { referralCode, referredWalletAddress } = req.body;

    if (!referralCode || !referredWalletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Referral code and wallet address are required'
      });
    }

    // Find referrer by code
    const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
    if (!referrer) {
      return res.status(404).json({
        success: false,
        message: 'Invalid referral code'
      });
    }

    // Find referred user
    const referredUser = await User.findOne({ walletAddress: referredWalletAddress.toLowerCase() });
    if (!referredUser) {
      return res.status(404).json({
        success: false,
        message: 'Referred user not found'
      });
    }

    // Check if user is trying to refer themselves
    if (referrer._id.toString() === referredUser._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot refer yourself'
      });
    }

    // Check if referral already exists
    const existingReferral = await ReferralSystem.findOne({
      referrerId: referrer._id,
      referredId: referredUser._id
    });

    if (existingReferral) {
      return res.status(400).json({
        success: false,
        message: 'Referral already exists'
      });
    }

    // Create new referral
    const referral = new ReferralSystem({
      referrerId: referrer._id,
      referrerAddress: referrer.walletAddress,
      referralCode: referralCode.toUpperCase(),
      referredId: referredUser._id,
      referredAddress: referredUser.walletAddress,
      ipAddress: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown',
      status: 'active' // Auto-activate for demo
    });

    await referral.save();

    // Update referrer stats
    referrer.totalReferrals += 1;
    await referrer.save();

    // Update referred user
    if (!referredUser.referredBy) {
      referredUser.referredBy = referrer._id;
      await referredUser.save();
    }

    res.json({
      success: true,
      message: 'Referral created successfully',
      data: { referralId: referral._id }
    });
  } catch (error) {
    console.error('Create referral error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Claim referral reward
router.post('/claim/:referralId', authenticateToken, async (req, res) => {
  try {
    const { referralId } = req.params;
    const userId = req.user.userId;

    const referral = await ReferralSystem.findById(referralId);
    if (!referral) {
      return res.status(404).json({
        success: false,
        message: 'Referral not found'
      });
    }

    // Check if user is the referrer
    if (referral.referrerId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to claim this reward'
      });
    }

    // Check if already claimed
    if (referral.rewardStatus.referrerClaimed) {
      return res.status(400).json({
        success: false,
        message: 'Reward already claimed'
      });
    }

    // Check if referral is active
    if (referral.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Referral not eligible for reward'
      });
    }

    // Get user and update balance
    const user = await User.findById(userId);
    const currentBalance = parseFloat(user.tokenBalances.xxxhub);
    const rewardAmount = referral.rewards.referrer.tokens;

    user.tokenBalances.xxxhub = (currentBalance + rewardAmount).toString();
    user.referralRewardsEarned += rewardAmount;
    await user.save();

    // Mark reward as claimed
    referral.rewardStatus.referrerClaimed = true;
    referral.rewardStatus.referrerClaimedAt = new Date();
    await referral.save();

    res.json({
      success: true,
      message: 'Reward claimed successfully',
      data: {
        rewardAmount,
        newBalance: user.tokenBalances.xxxhub
      }
    });
  } catch (error) {
    console.error('Claim referral reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
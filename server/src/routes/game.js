import express from 'express';
import jwt from 'jsonwebtoken';
import { User, SpinResult, Reward } from '../../schemas/index.js';

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

// Get available rewards
router.get('/rewards', async (req, res) => {
  try {
    const rewards = await Reward.find({ isActive: true }).sort({ position: 1 });
    
    res.json({
      success: true,
      data: { rewards }
    });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Purchase tickets
router.post('/purchase-tickets', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.userId;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ticket amount'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const cost = amount * 10; // 10 XXX per ticket
    const currentBalance = parseFloat(user.tokenBalances.xxxhub);

    if (currentBalance < cost) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Update user balance and tickets
    user.tokenBalances.xxxhub = (currentBalance - cost).toString();
    user.currentTickets += amount;
    user.ticketsPurchased += amount;
    user.totalSpent += cost;
    user.lastActivityDate = new Date();

    await user.save();

    res.json({
      success: true,
      message: `Successfully purchased ${amount} tickets`,
      data: {
        ticketsPurchased: amount,
        currentTickets: user.currentTickets,
        newBalance: user.tokenBalances.xxxhub,
        totalSpent: cost
      }
    });
  } catch (error) {
    console.error('Purchase tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Spin the wheel
router.post('/spin', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.currentTickets <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No tickets available'
      });
    }

    // Get active rewards
    const rewards = await Reward.find({ isActive: true }).sort({ position: 1 });
    
    if (rewards.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'No rewards available'
      });
    }

    // Generate random result based on probabilities
    const getRandomReward = () => {
      // Filter active rewards
      const activeRewards = rewards.filter(r => r.isActive).sort((a, b) => a.position - b.position);
      
      if (activeRewards.length === 0) {
        throw new Error('No active rewards available');
      }
      
      // Calculate total probability
      const totalProbability = activeRewards.reduce((sum, r) => sum + r.probability, 0);
      
      // Normalize probabilities if they don't add up to 100
      const normalizationFactor = totalProbability > 0 ? 100 / totalProbability : 1;
      
      // Generate a more secure random number between 0-100
      const random = (Math.random() * 100).toFixed(6);
      
      // Select reward based on probability
      let cumulativeProbability = 0;
      for (const reward of activeRewards) {
        // Use normalized probability
        const normalizedProbability = reward.probability * normalizationFactor;
        cumulativeProbability += normalizedProbability;
        
        if (random <= cumulativeProbability) {
          return reward;
        }
      }
      
      // Fallback to first reward (should rarely happen)
      return activeRewards[0];
    }
    
    // Get the selected reward
    const selectedReward = getRandomReward();

    // Create spin result
    const spinResult = new SpinResult({
      userId: user._id,
      spinId: `spin_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      walletAddress: user.walletAddress,
      rewardId: selectedReward._id,
      rewardName: selectedReward.name,
      rewardType: selectedReward.rewardType,
      winAmount: selectedReward.value,
      wheelPosition: selectedReward.position,
      randomSeed: Math.random().toString(36).substring(2, 15),
      ipAddress: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown',
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`
    });

    await spinResult.save();

    // Update user stats
    user.currentTickets -= 1;
    user.totalSpins += 1;
    user.totalWinnings += selectedReward.value;
    user.lastActivityDate = new Date();

    // Add winnings to balance if it's tokens
    if (selectedReward.rewardType === 'tokens') {
      const currentBalance = parseFloat(user.tokenBalances.xxxhub);
      user.tokenBalances.xxxhub = (currentBalance + selectedReward.value).toString();
    }

    await user.save();

    // Update reward claim count
    selectedReward.currentClaims += 1;
    selectedReward.totalClaimed += 1;
    selectedReward.totalValue += selectedReward.value || 0;
    selectedReward.lastWon = new Date();
    
    // Update win rate
    const totalClaims = selectedReward.totalClaimed || 0;
    const allSpins = await SpinResult.countDocuments();
    if (allSpins > 0) {
      selectedReward.winRate = (totalClaims / allSpins) * 100;
    }
    
    await selectedReward.save();

    res.json({
      success: true,
      message: 'Spin completed successfully',
      data: {
        spinResult: {
          id: spinResult._id,
          rewardName: selectedReward.name,
          rewardType: selectedReward.rewardType,
          winAmount: selectedReward.value,
          wheelPosition: selectedReward.position,
          timestamp: spinResult.spinTimestamp,
          id: spinResult.spinId
        },
        userStats: {
          currentTickets: user.currentTickets,
          totalSpins: user.totalSpins,
          totalWinnings: user.totalWinnings,
          newBalance: user.tokenBalances.xxxhub
        }
      }
    });
  } catch (error) {
    console.error('Spin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get spin history
router.get('/spin-history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const spinResults = await SpinResult.find({ userId })
      .sort({ spinTimestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('rewardId', 'name icon color');

    const total = await SpinResult.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        spins: spinResults.map(spin => ({
          id: spin._id,
          reward: spin.rewardName,
          type: spin.rewardType,
          winAmount: spin.winAmount,
          timestamp: spin.spinTimestamp,
          wheelPosition: spin.wheelPosition,
          id: spin.spinId
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get spin history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
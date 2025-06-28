import express from 'express';
import jwt from 'jsonwebtoken';
import { Admin, User, SpinResult, Reward, SocialTask, ReferralSystem, Transaction } from '../../schemas/index.js';

const router = express.Router();

// Admin authentication middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await Admin.findById(decoded.adminId);

    if (!admin || !admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Permission check middleware
const checkPermission = (module, action) => {
  return (req, res, next) => {
    if (req.admin.role === 'super_admin') {
      return next();
    }
    
    if (!req.admin.hasPermission(module, action)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (admin.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is locked. Please try again later.'
      });
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      await admin.recordFailedLogin();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Record successful login
    await admin.recordLogin(req.ip);

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          lastLogin: admin.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get admin dashboard stats
router.get('/dashboard/stats', authenticateAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalSpins,
      totalRevenue,
      activeUsers,
      recentSpins,
      topUsers
    ] = await Promise.all([
      User.countDocuments(),
      SpinResult.countDocuments(),
      User.aggregate([{ $group: { _id: null, total: { $sum: '$totalSpent' } } }]),
      User.countDocuments({ lastActivityDate: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
      SpinResult.find().sort({ spinTimestamp: -1 }).limit(10).populate('userId', 'walletAddress'),
      User.find().sort({ totalSpent: -1 }).limit(5).select('walletAddress totalSpent totalWinnings')
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSpins,
        totalRevenue: totalRevenue[0]?.total || 0,
        activeUsers,
        recentSpins: recentSpins.map(spin => ({
          id: spin._id,
          userAddress: spin.walletAddress,
          reward: spin.rewardName,
          winAmount: spin.winAmount,
          timestamp: spin.spinTimestamp
        })),
        topUsers: topUsers.map(user => ({
          address: user.walletAddress,
          totalSpent: user.totalSpent,
          totalWinnings: user.totalWinnings,
          profitLoss: user.totalWinnings - user.totalSpent
        }))
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// User management routes
router.get('/users', authenticateAdmin, checkPermission('users', 'read'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'joinDate';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const query = search ? {
      $or: [
        { walletAddress: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const users = await User.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users: users.map(user => ({
          id: user._id,
          walletAddress: user.walletAddress,
          totalSpins: user.totalSpins,
          totalWinnings: user.totalWinnings,
          totalSpent: user.totalSpent,
          currentTickets: user.currentTickets,
          isVip: user.isVip,
          joinDate: user.joinDate,
          lastActivityDate: user.lastActivityDate,
          winRate: user.winRate,
          profitLoss: user.profitLoss
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
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reward management routes
router.get('/rewards', authenticateAdmin, checkPermission('rewards', 'read'), async (req, res) => {
  try {
    const rewards = await Reward.find().sort({ position: 1 });
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

router.post('/rewards', authenticateAdmin, checkPermission('rewards', 'create'), async (req, res) => {
  try {
    const rewardData = {
      ...req.body,
      createdBy: req.admin._id
    };

    const reward = new Reward(rewardData);
    await reward.save();

    res.json({
      success: true,
      message: 'Reward created successfully',
      data: { reward }
    });
  } catch (error) {
    console.error('Create reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.put('/rewards/:id', authenticateAdmin, checkPermission('rewards', 'update'), async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastModifiedBy: req.admin._id },
      { new: true }
    );

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }

    res.json({
      success: true,
      message: 'Reward updated successfully',
      data: { reward }
    });
  } catch (error) {
    console.error('Update reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.delete('/rewards/:id', authenticateAdmin, checkPermission('rewards', 'delete'), async (req, res) => {
  try {
    const reward = await Reward.findByIdAndDelete(req.params.id);

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }

    res.json({
      success: true,
      message: 'Reward deleted successfully'
    });
  } catch (error) {
    console.error('Delete reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Pricing control routes
router.get('/pricing', authenticateAdmin, checkPermission('pricing', 'read'), async (req, res) => {
  try {
    // For now, return static pricing data since we don't have a pricing schema
    // In production, you'd want to create a PricingRule schema
    const pricingRules = [
      {
        id: '1',
        minTickets: 10,
        maxTickets: 49,
        discountPercentage: 5,
        isActive: true
      },
      {
        id: '2',
        minTickets: 50,
        maxTickets: 99,
        discountPercentage: 10,
        isActive: true
      },
      {
        id: '3',
        minTickets: 100,
        maxTickets: 499,
        discountPercentage: 15,
        isActive: true
      },
      {
        id: '4',
        minTickets: 500,
        maxTickets: 999,
        discountPercentage: 20,
        isActive: true
      },
      {
        id: '5',
        minTickets: 1000,
        maxTickets: 9999,
        discountPercentage: 25,
        isActive: true
      }
    ];

    res.json({
      success: true,
      data: { 
        basePrice: 10,
        pricingRules 
      }
    });
  } catch (error) {
    console.error('Get pricing error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Social tasks management
router.get('/social-tasks', authenticateAdmin, checkPermission('social_tasks', 'read'), async (req, res) => {
  try {
    const tasks = await SocialTask.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    console.error('Get social tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.post('/social-tasks', authenticateAdmin, checkPermission('social_tasks', 'create'), async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.admin._id
    };

    const task = new SocialTask(taskData);
    await task.save();

    res.json({
      success: true,
      message: 'Social task created successfully',
      data: { task }
    });
  } catch (error) {
    console.error('Create social task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.put('/social-tasks/:id', authenticateAdmin, checkPermission('social_tasks', 'update'), async (req, res) => {
  try {
    const task = await SocialTask.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastModifiedBy: req.admin._id },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Social task not found'
      });
    }

    res.json({
      success: true,
      message: 'Social task updated successfully',
      data: { task }
    });
  } catch (error) {
    console.error('Update social task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.delete('/social-tasks/:id', authenticateAdmin, checkPermission('social_tasks', 'delete'), async (req, res) => {
  try {
    const task = await SocialTask.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Social task not found'
      });
    }

    res.json({
      success: true,
      message: 'Social task deleted successfully'
    });
  } catch (error) {
    console.error('Delete social task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Referral system management
router.get('/referrals', authenticateAdmin, checkPermission('referrals', 'read'), async (req, res) => {
  try {
    const referrals = await ReferralSystem.find()
      .populate('referrerId', 'walletAddress')
      .populate('referredId', 'walletAddress')
      .sort({ createdAt: -1 })
      .limit(100);

    const stats = await ReferralSystem.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRewards: {
            $sum: {
              $cond: [
                '$rewardStatus.referrerClaimed',
                '$rewards.referrer.tokens',
                0
              ]
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        referrals: referrals.map(ref => ({
          id: ref._id,
          referrerAddress: ref.referrerAddress,
          referredAddress: ref.referredAddress,
          status: ref.status,
          rewardClaimed: ref.rewardStatus.referrerClaimed,
          createdAt: ref.createdAt
        })),
        stats
      }
    });
  } catch (error) {
    console.error('Get referrals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Spin board management (rewards with position focus)
router.get('/spin-board', authenticateAdmin, checkPermission('spin_board', 'read'), async (req, res) => {
  try {
    const rewards = await Reward.find().sort({ position: 1 });

    // Calculate total probability
    const totalProbability = rewards.reduce((sum, reward) => sum + (reward.isActive ? reward.probability : 0), 0);

    // Get statistics about reward distribution
    const rewardStats = await SpinResult.aggregate([
      {
        $group: {
          _id: '$rewardType',
          count: { $sum: 1 },
          totalWinnings: { $sum: '$winAmount' }
        }
      }
    ]);

    // Get most common rewards
    const popularRewards = await SpinResult.aggregate([
      {
        $group: {
          _id: '$rewardId',
          count: { $sum: 1 },
          name: { $first: '$rewardName' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: { 
        rewards,
        totalProbability,
        isValid: totalProbability === 100,
        rewardStats,
        popularRewards
      }
    });
  } catch (error) {
    console.error('Get spin board error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.put('/spin-board/reorder', authenticateAdmin, checkPermission('spin_board', 'update'), async (req, res) => {
  try {
    const { rewardIds } = req.body; // Array of reward IDs in new order
    
    // Update positions
    for (let i = 0; i < rewardIds.length; i++) {
      await Reward.findByIdAndUpdate(rewardIds[i], { position: i });
    }
    
    res.json({
      success: true,
      message: 'Spin board reordered successfully'
    });
  } catch (error) {
    console.error('Reorder spin board error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Analytics routes
router.get('/analytics/overview', authenticateAdmin, checkPermission('analytics', 'read'), async (req, res) => {
  try {
    const timeframe = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeframe);

    const [userGrowth, revenueData, spinData] = await Promise.all([
      User.aggregate([
        { $match: { joinDate: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$joinDate' } },
            newUsers: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      User.aggregate([
        { $match: { joinDate: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$joinDate' } },
            revenue: { $sum: '$totalSpent' }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      SpinResult.aggregate([
        { $match: { spinTimestamp: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$spinTimestamp' } },
            totalSpins: { $sum: 1 },
            totalWinnings: { $sum: '$winAmount' }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        userGrowth,
        revenueData,
        spinData
      }
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Transaction management
router.get('/transactions', authenticateAdmin, checkPermission('transactions', 'read'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const type = req.query.type;
    const status = req.query.status;

    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const transactions = await Transaction.find(query)
      .populate('userId', 'walletAddress')
      .sort({ transactionTimestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Transaction.countDocuments(query);

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin logout
router.post('/logout', authenticateAdmin, async (req, res) => {
  try {
    // In a real implementation, you might want to blacklist the token
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
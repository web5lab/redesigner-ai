import express from 'express';
import jwt from 'jsonwebtoken';
import { User, SocialTask } from '../../schemas/index.js';

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

// Get available tasks
router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    const tasks = await SocialTask.find({
      isActive: true,
      startDate: { $lte: new Date() },
      $or: [
        { endDate: null },
        { endDate: { $gte: new Date() } }
      ]
    }).sort({ featured: -1, priority: -1 });

    // Add completion status for each task
    const tasksWithStatus = tasks.map(task => {
      const completion = task.completions.find(c => c.userId.toString() === userId);
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        platform: task.platform,
        action: task.action,
        url: task.url,
        reward: task.reward,
        status: completion ? completion.status : 'available',
        completedAt: completion ? completion.submittedAt : null,
        rewardClaimed: completion ? completion.rewardClaimed : false
      };
    });

    res.json({
      success: true,
      data: { tasks: tasksWithStatus }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Submit task completion
router.post('/tasks/:taskId/submit', authenticateToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;
    const { proof } = req.body;

    const task = await SocialTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user already completed this task
    const existingCompletion = task.completions.find(c => c.userId.toString() === userId);
    if (existingCompletion) {
      return res.status(400).json({
        success: false,
        message: 'Task already submitted'
      });
    }

    // Add completion
    task.completions.push({
      userId: user._id,
      walletAddress: user.walletAddress,
      submissionData: { proof },
      status: 'verified' // Auto-verify for demo
    });

    task.currentCompletions += 1;
    await task.save();

    res.json({
      success: true,
      message: 'Task submitted successfully',
      data: { status: 'verified' }
    });
  } catch (error) {
    console.error('Submit task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Claim task reward
router.post('/tasks/:taskId/claim', authenticateToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;

    const task = await SocialTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find completion
    const completion = task.completions.find(c => c.userId.toString() === userId);
    if (!completion) {
      return res.status(400).json({
        success: false,
        message: 'Task not completed'
      });
    }

    if (completion.status !== 'verified') {
      return res.status(400).json({
        success: false,
        message: 'Task not verified'
      });
    }

    if (completion.rewardClaimed) {
      return res.status(400).json({
        success: false,
        message: 'Reward already claimed'
      });
    }

    // Mark as claimed
    completion.rewardClaimed = true;
    completion.claimedAt = new Date();
    await task.save();

    // Add reward to user
    const reward = task.reward;
    if (reward.type === 'tokens') {
      const currentBalance = parseFloat(user.tokenBalances.xxxhub);
      user.tokenBalances.xxxhub = (currentBalance + reward.amount).toString();
    } else if (reward.type === 'tickets') {
      user.currentTickets += reward.amount;
    }

    user.lastActivityDate = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Reward claimed successfully',
      data: {
        reward: {
          type: reward.type,
          amount: reward.amount
        },
        newBalance: user.tokenBalances.xxxhub,
        newTickets: user.currentTickets
      }
    });
  } catch (error) {
    console.error('Claim reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
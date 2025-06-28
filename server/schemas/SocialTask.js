const mongoose = require('mongoose');

const socialTaskSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  
  // Platform and Action
  platform: {
    type: String,
    required: true,
    enum: ['twitter', 'telegram', 'discord', 'youtube', 'instagram', 'tiktok', 'facebook'],
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: ['follow', 'like', 'share', 'join', 'subscribe', 'retweet', 'comment', 'tag_friends'],
    index: true
  },
  
  // Task URL and Verification
  url: {
    type: String,
    required: true,
    trim: true
  },
  verificationMethod: {
    type: String,
    enum: ['manual', 'api', 'screenshot', 'automatic'],
    default: 'manual'
  },
  verificationData: {
    apiEndpoint: String,
    requiredText: String,
    minimumFollowers: Number,
    hashtags: [String]
  },
  
  // Reward Configuration
  reward: {
    type: {
      type: String,
      required: true,
      enum: ['tokens', 'tickets', 'spins', 'nft', 'multiplier']
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    tokenType: {
      type: String,
      enum: ['XXX', 'BNB', 'USDT', 'SPINWIN'],
      default: 'XXX'
    }
  },
  
  // Task Availability
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  maxCompletions: {
    type: Number,
    default: null // null means unlimited
  },
  currentCompletions: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Time Restrictions
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  
  // User Restrictions
  minLevel: {
    type: Number,
    default: 0,
    min: 0
  },
  maxLevel: {
    type: Number,
    default: null
  },
  vipOnly: {
    type: Boolean,
    default: false
  },
  oneTimeOnly: {
    type: Boolean,
    default: true
  },
  
  // Completion Tracking
  completions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    walletAddress: {
      type: String,
      required: true,
      lowercase: true
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'expired'],
      default: 'pending'
    },
    submissionData: {
      screenshot: String,
      proof: String,
      userInput: String,
      metadata: mongoose.Schema.Types.Mixed
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    verifiedAt: {
      type: Date,
      sparse: true
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      sparse: true
    },
    rewardClaimed: {
      type: Boolean,
      default: false
    },
    claimedAt: {
      type: Date,
      sparse: true
    },
    rejectionReason: {
      type: String,
      sparse: true
    }
  }],
  
  // Statistics
  totalRewardsPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  averageCompletionTime: {
    type: Number, // in minutes
    default: 0
  },
  
  // Admin Information
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    sparse: true
  },
  
  // Priority and Ordering
  priority: {
    type: Number,
    default: 0,
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

// Indexes
socialTaskSchema.index({ platform: 1, isActive: 1 });
socialTaskSchema.index({ isActive: 1, priority: -1, featured: -1 });
socialTaskSchema.index({ 'completions.userId': 1, 'completions.status': 1 });

// Virtual for availability
socialTaskSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  const timeAvailable = this.startDate <= now && (!this.endDate || this.endDate >= now);
  const completionAvailable = !this.maxCompletions || this.currentCompletions < this.maxCompletions;
  
  return this.isActive && timeAvailable && completionAvailable;
});

// Methods
socialTaskSchema.methods.submitCompletion = function(userId, walletAddress, submissionData = {}) {
  // Check if user already completed this task (if oneTimeOnly)
  if (this.oneTimeOnly) {
    const existingCompletion = this.completions.find(
      comp => comp.userId.toString() === userId.toString()
    );
    if (existingCompletion) {
      throw new Error('Task already completed by this user');
    }
  }
  
  this.completions.push({
    userId,
    walletAddress,
    submissionData,
    status: 'pending'
  });
  
  this.currentCompletions += 1;
  return this.save();
};

socialTaskSchema.methods.verifyCompletion = function(completionId, adminId, approved = true, rejectionReason = null) {
  const completion = this.completions.id(completionId);
  if (!completion) {
    throw new Error('Completion not found');
  }
  
  completion.status = approved ? 'verified' : 'rejected';
  completion.verifiedAt = new Date();
  completion.verifiedBy = adminId;
  
  if (!approved && rejectionReason) {
    completion.rejectionReason = rejectionReason;
  }
  
  return this.save();
};

socialTaskSchema.methods.claimReward = function(completionId) {
  const completion = this.completions.id(completionId);
  if (!completion) {
    throw new Error('Completion not found');
  }
  
  if (completion.status !== 'verified') {
    throw new Error('Completion not verified');
  }
  
  if (completion.rewardClaimed) {
    throw new Error('Reward already claimed');
  }
  
  completion.rewardClaimed = true;
  completion.claimedAt = new Date();
  this.totalRewardsPaid += this.reward.amount;
  
  return this.save();
};

// Static methods
socialTaskSchema.statics.getAvailableTasksForUser = function(userId, userLevel = 0, isVip = false) {
  const now = new Date();
  
  return this.find({
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: null },
      { endDate: { $gte: now } }
    ],
    $or: [
      { maxCompletions: null },
      { $expr: { $lt: ['$currentCompletions', '$maxCompletions'] } }
    ],
    minLevel: { $lte: userLevel },
    $or: [
      { maxLevel: null },
      { maxLevel: { $gte: userLevel } }
    ],
    $or: [
      { vipOnly: false },
      { vipOnly: true, $expr: { $eq: [isVip, true] } }
    ]
  }).sort({ featured: -1, priority: -1, createdAt: -1 });
};

socialTaskSchema.statics.getUserCompletionStatus = function(userId) {
  return this.aggregate([
    { $unwind: '$completions' },
    { $match: { 'completions.userId': mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$completions.status',
        count: { $sum: 1 },
        totalRewards: { $sum: '$reward.amount' }
      }
    }
  ]);
};

module.exports = mongoose.model('SocialTask', socialTaskSchema);
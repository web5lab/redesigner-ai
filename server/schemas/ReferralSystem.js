import mongoose from 'mongoose';

const referralSystemSchema = new mongoose.Schema({
  // Referrer Information
  referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  referrerAddress: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  referralCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  
  // Referred User Information
  referredId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  referredAddress: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  
  // Referral Status
  status: {
    type: String,
    required: true,
    enum: ['pending', 'active', 'completed', 'expired', 'cancelled'],
    default: 'pending',
    index: true
  },
  
  // Qualification Requirements
  qualificationRules: {
    minSpins: {
      type: Number,
      default: 1
    },
    minSpent: {
      type: Number,
      default: 10
    },
    timeLimit: {
      type: Number, // in days
      default: 30
    }
  },
  
  // Progress Tracking
  progress: {
    currentSpins: {
      type: Number,
      default: 0
    },
    currentSpent: {
      type: Number,
      default: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  
  // Rewards Configuration
  rewards: {
    referrer: {
      tokens: {
        type: Number,
        default: 200
      },
      spins: {
        type: Number,
        default: 5
      },
      tickets: {
        type: Number,
        default: 0
      }
    },
    referred: {
      tokens: {
        type: Number,
        default: 100
      },
      spins: {
        type: Number,
        default: 3
      },
      tickets: {
        type: Number,
        default: 2
      }
    }
  },
  
  // Reward Status
  rewardStatus: {
    referrerClaimed: {
      type: Boolean,
      default: false
    },
    referredClaimed: {
      type: Boolean,
      default: false
    },
    referrerClaimedAt: {
      type: Date,
      sparse: true
    },
    referredClaimedAt: {
      type: Date,
      sparse: true
    },
    referrerTransactionHash: {
      type: String,
      sparse: true
    },
    referredTransactionHash: {
      type: String,
      sparse: true
    }
  },
  
  // Milestone Tracking
  milestones: [{
    level: {
      type: Number,
      required: true
    },
    requirement: {
      type: Number,
      required: true
    },
    reward: {
      type: Number,
      required: true
    },
    achieved: {
      type: Boolean,
      default: false
    },
    achievedAt: {
      type: Date,
      sparse: true
    },
    claimed: {
      type: Boolean,
      default: false
    },
    claimedAt: {
      type: Date,
      sparse: true
    }
  }],
  
  // Tracking Information
  source: {
    type: String,
    enum: ['direct', 'social', 'email', 'advertisement', 'organic'],
    default: 'direct'
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  activatedAt: {
    type: Date,
    sparse: true
  },
  completedAt: {
    type: Date,
    sparse: true
  },
  expiresAt: {
    type: Date,
    index: true
  }
}, {
  timestamps: true
});

// Compound indexes
referralSystemSchema.index({ referrerId: 1, status: 1 });
referralSystemSchema.index({ referredId: 1, status: 1 });
referralSystemSchema.index({ referralCode: 1, status: 1 });
referralSystemSchema.index({ status: 1, expiresAt: 1 });

// Pre-save middleware to set expiration date
referralSystemSchema.pre('save', function(next) {
  if (this.isNew && !this.expiresAt) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + this.qualificationRules.timeLimit);
    this.expiresAt = expirationDate;
  }
  next();
});

// Virtual for qualification status
referralSystemSchema.virtual('isQualified').get(function() {
  return this.progress.currentSpins >= this.qualificationRules.minSpins &&
         this.progress.currentSpent >= this.qualificationRules.minSpent;
});

// Virtual for time remaining
referralSystemSchema.virtual('timeRemaining').get(function() {
  if (this.status === 'completed' || this.status === 'expired') return 0;
  const now = new Date();
  const remaining = this.expiresAt.getTime() - now.getTime();
  return Math.max(0, Math.floor(remaining / (1000 * 60 * 60 * 24))); // days
});

// Methods
referralSystemSchema.methods.updateProgress = function(spins = 0, spent = 0) {
  this.progress.currentSpins += spins;
  this.progress.currentSpent += spent;
  this.progress.lastActivity = new Date();
  
  // Check if qualified
  if (this.isQualified && this.status === 'pending') {
    this.status = 'active';
    this.activatedAt = new Date();
  }
  
  return this.save();
};

referralSystemSchema.methods.claimReferrerReward = function(transactionHash) {
  if (this.status !== 'active' && this.status !== 'completed') {
    throw new Error('Referral not eligible for reward claim');
  }
  
  if (this.rewardStatus.referrerClaimed) {
    throw new Error('Referrer reward already claimed');
  }
  
  this.rewardStatus.referrerClaimed = true;
  this.rewardStatus.referrerClaimedAt = new Date();
  this.rewardStatus.referrerTransactionHash = transactionHash;
  
  if (this.rewardStatus.referredClaimed) {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  return this.save();
};

referralSystemSchema.methods.claimReferredReward = function(transactionHash) {
  if (this.status !== 'active' && this.status !== 'completed') {
    throw new Error('Referral not eligible for reward claim');
  }
  
  if (this.rewardStatus.referredClaimed) {
    throw new Error('Referred reward already claimed');
  }
  
  this.rewardStatus.referredClaimed = true;
  this.rewardStatus.referredClaimedAt = new Date();
  this.rewardStatus.referredTransactionHash = transactionHash;
  
  if (this.rewardStatus.referrerClaimed) {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  return this.save();
};

referralSystemSchema.methods.addMilestone = function(level, requirement, reward) {
  this.milestones.push({
    level,
    requirement,
    reward,
    achieved: false,
    claimed: false
  });
  
  return this.save();
};

referralSystemSchema.methods.checkMilestones = function(totalReferrals) {
  let updated = false;
  
  this.milestones.forEach(milestone => {
    if (!milestone.achieved && totalReferrals >= milestone.requirement) {
      milestone.achieved = true;
      milestone.achievedAt = new Date();
      updated = true;
    }
  });
  
  if (updated) {
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Static methods
referralSystemSchema.statics.getUserReferralStats = function(userId) {
  return this.aggregate([
    { $match: { referrerId: mongoose.Types.ObjectId(userId) } },
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
};

referralSystemSchema.statics.getTopReferrers = function(limit = 10, timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: '$referrerId',
        totalReferrals: { $sum: 1 },
        activeReferrals: {
          $sum: {
            $cond: [{ $eq: ['$status', 'active'] }, 1, 0]
          }
        },
        completedReferrals: {
          $sum: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        }
      }
    },
    { $sort: { totalReferrals: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    }
  ]);
};

referralSystemSchema.statics.expireOldReferrals = function() {
  const now = new Date();
  
  return this.updateMany(
    {
      status: { $in: ['pending', 'active'] },
      expiresAt: { $lt: now }
    },
    {
      $set: { status: 'expired' }
    }
  );
};

export default mongoose.model('ReferralSystem', referralSystemSchema);
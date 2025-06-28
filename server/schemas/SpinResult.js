import mongoose from 'mongoose';

const spinResultSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  walletAddress: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  
  // Spin Details
  spinId: {
    type: String,
    required: true,
    unique: true
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward',
    required: true
  },
  rewardName: {
    type: String,
    required: true
  },
  rewardType: {
    type: String,
    enum: ['tokens', 'nft', 'bonus', 'nothing', 'jackpot', 'multiplier'],
    required: true
  },
  
  // Reward Values
  winAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  tokenType: {
    type: String,
    enum: ['XXX', 'BNB', 'USDT', 'XXXHUB'],
    default: 'XXX'
  },
  nftDetails: {
    tokenId: String,
    contractAddress: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  
  // Transaction Information
  transactionHash: {
    type: String,
    sparse: true,
    index: true
  },
  blockNumber: {
    type: Number,
    sparse: true
  },
  gasUsed: {
    type: Number,
    sparse: true
  },
  transactionStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  
  // Game State
  wheelPosition: {
    type: Number,
    required: true,
    min: 0,
    max: 7
  },
  spinDuration: {
    type: Number,
    default: 4000
  },
  randomSeed: {
    type: String,
    required: true
  },
  
  // Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationHash: {
    type: String,
    sparse: true
  },
  
  // Metadata
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  
  // Timestamps
  spinTimestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  claimedAt: {
    type: Date,
    sparse: true
  }
}, {
  timestamps: true
});

// Indexes for performance
spinResultSchema.index({ userId: 1, spinTimestamp: -1 });
spinResultSchema.index({ walletAddress: 1, spinTimestamp: -1 });
spinResultSchema.index({ rewardType: 1, spinTimestamp: -1 });
spinResultSchema.index({ transactionHash: 1 });
spinResultSchema.index({ spinTimestamp: -1 });

// Pre-save middleware to generate spin ID
spinResultSchema.pre('save', function(next) {
  if (this.isNew && !this.spinId) {
    this.spinId = `spin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Methods
spinResultSchema.methods.markAsClaimed = function(transactionHash) {
  this.claimedAt = new Date();
  this.transactionHash = transactionHash;
  this.transactionStatus = 'confirmed';
  return this.save();
};

spinResultSchema.methods.markAsVerified = function(verificationHash) {
  this.isVerified = true;
  this.verificationHash = verificationHash;
  return this.save();
};

// Static methods
spinResultSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalSpins: { $sum: 1 },
        totalWinnings: { $sum: '$winAmount' },
        winningSpins: {
          $sum: {
            $cond: [{ $gt: ['$winAmount', 0] }, 1, 0]
          }
        },
        rewardTypes: { $push: '$rewardType' }
      }
    },
    {
      $project: {
        totalSpins: 1,
        totalWinnings: 1,
        winningSpins: 1,
        winRate: {
          $multiply: [
            { $divide: ['$winningSpins', '$totalSpins'] },
            100
          ]
        }
      }
    }
  ]);
};

export default mongoose.model('SpinResult', spinResultSchema);
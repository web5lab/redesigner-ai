import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
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
  
  // Transaction Details
  transactionHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  blockNumber: {
    type: Number,
    required: true,
    index: true
  },
  blockHash: {
    type: String,
    required: true
  },
  transactionIndex: {
    type: Number,
    required: true
  },
  
  // Transaction Type and Purpose
  type: {
    type: String,
    required: true,
    enum: [
      'ticket_purchase',
      'spin_reward',
      'referral_reward',
      'social_task_reward',
      'airdrop',
      'token_swap',
      'nft_mint',
      'withdrawal',
      'deposit'
    ],
    index: true
  },
  purpose: {
    type: String,
    required: true,
    trim: true
  },
  
  // Financial Details
  amount: {
    type: String, // Using string to handle large numbers and decimals
    required: true
  },
  tokenType: {
    type: String,
    required: true,
    enum: ['BNB', 'USDT', 'BUSD', 'XXX', 'XXXHUB'],
    index: true
  },
  tokenAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  
  // USD Values (for reporting)
  usdValue: {
    type: Number,
    default: 0
  },
  exchangeRate: {
    type: Number,
    default: 0
  },
  
  // Gas Information
  gasUsed: {
    type: Number,
    required: true
  },
  gasPrice: {
    type: String,
    required: true
  },
  gasFee: {
    type: String,
    required: true
  },
  
  // Transaction Status
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'failed', 'cancelled'],
    default: 'pending',
    index: true
  },
  confirmations: {
    type: Number,
    default: 0
  },
  
  // Network Information
  network: {
    type: String,
    required: true,
    default: 'BSC'
  },
  chainId: {
    type: Number,
    required: true,
    default: 56
  },
  
  // Related Records
  relatedSpinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SpinResult',
    sparse: true
  },
  relatedTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialTask',
    sparse: true
  },
  relatedAirdropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AirdropCampaign',
    sparse: true
  },
  
  // Error Information (if failed)
  errorMessage: {
    type: String,
    sparse: true
  },
  errorCode: {
    type: String,
    sparse: true
  },
  
  // Metadata
  fromAddress: {
    type: String,
    lowercase: true,
    sparse: true
  },
  toAddress: {
    type: String,
    lowercase: true,
    sparse: true
  },
  contractAddress: {
    type: String,
    lowercase: true,
    sparse: true
  },
  
  // Timestamps
  transactionTimestamp: {
    type: Date,
    required: true,
    index: true
  },
  confirmedAt: {
    type: Date,
    sparse: true
  }
}, {
  timestamps: true
});

// Compound indexes for performance
transactionSchema.index({ userId: 1, transactionTimestamp: -1 });
transactionSchema.index({ walletAddress: 1, type: 1, transactionTimestamp: -1 });
transactionSchema.index({ status: 1, transactionTimestamp: -1 });
transactionSchema.index({ tokenType: 1, transactionTimestamp: -1 });

// Methods
transactionSchema.methods.markAsConfirmed = function(confirmations = 1) {
  this.status = 'confirmed';
  this.confirmations = confirmations;
  this.confirmedAt = new Date();
  return this.save();
};

transactionSchema.methods.markAsFailed = function(errorMessage, errorCode) {
  this.status = 'failed';
  this.errorMessage = errorMessage;
  this.errorCode = errorCode;
  return this.save();
};

// Static methods
transactionSchema.statics.getUserTransactionHistory = function(userId, limit = 50) {
  return this.find({ userId })
    .sort({ transactionTimestamp: -1 })
    .limit(limit)
    .populate('relatedSpinId relatedTaskId relatedAirdropId');
};

transactionSchema.statics.getTransactionStats = function(timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    { $match: { transactionTimestamp: { $gte: startDate } } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        totalAmount: { $sum: { $toDouble: '$amount' } },
        totalUsdValue: { $sum: '$usdValue' },
        avgAmount: { $avg: { $toDouble: '$amount' } }
      }
    }
  ]);
};

export default mongoose.model('Transaction', transactionSchema);
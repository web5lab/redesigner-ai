const mongoose = require('mongoose');

const airdropCampaignSchema = new mongoose.Schema({
  // Campaign Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  
  // Airdrop Type and Configuration
  type: {
    type: String,
    required: true,
    enum: ['tokens', 'nft', 'mixed'],
    index: true
  },
  tokenDetails: {
    tokenAddress: {
      type: String,
      lowercase: true,
      sparse: true
    },
    tokenSymbol: {
      type: String,
      uppercase: true,
      sparse: true
    },
    amount: {
      type: String, // Using string for large numbers
      sparse: true
    },
    decimals: {
      type: Number,
      default: 18,
      sparse: true
    }
  },
  nftDetails: {
    contractAddress: {
      type: String,
      lowercase: true,
      sparse: true
    },
    tokenIds: [String],
    metadata: [mongoose.Schema.Types.Mixed]
  },
  
  // Distribution Strategy
  distributionType: {
    type: String,
    required: true,
    enum: ['equal', 'weighted', 'random', 'tiered'],
    default: 'equal'
  },
  distributionRules: {
    minBalance: {
      type: String,
      default: '0'
    },
    minSpins: {
      type: Number,
      default: 0
    },
    minReferrals: {
      type: Number,
      default: 0
    },
    vipOnly: {
      type: Boolean,
      default: false
    },
    excludeAddresses: [String]
  },
  
  // Recipients
  recipients: [{
    walletAddress: {
      type: String,
      required: true,
      lowercase: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      sparse: true
    },
    allocation: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'claimed'],
      default: 'pending'
    },
    transactionHash: {
      type: String,
      sparse: true
    },
    sentAt: {
      type: Date,
      sparse: true
    },
    claimedAt: {
      type: Date,
      sparse: true
    },
    errorMessage: {
      type: String,
      sparse: true
    }
  }],
  
  // Campaign Status
  status: {
    type: String,
    required: true,
    enum: ['draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled'],
    default: 'draft',
    index: true
  },
  
  // Timing
  scheduledDate: {
    type: Date,
    sparse: true
  },
  startDate: {
    type: Date,
    sparse: true
  },
  endDate: {
    type: Date,
    sparse: true
  },
  claimDeadline: {
    type: Date,
    sparse: true
  },
  
  // Execution Details
  executionMethod: {
    type: String,
    enum: ['automatic', 'manual', 'claim_based'],
    default: 'automatic'
  },
  batchSize: {
    type: Number,
    default: 100,
    min: 1,
    max: 1000
  },
  gasPrice: {
    type: String,
    sparse: true
  },
  totalGasUsed: {
    type: String,
    default: '0'
  },
  
  // Statistics
  totalRecipients: {
    type: Number,
    default: 0
  },
  successfulSends: {
    type: Number,
    default: 0
  },
  failedSends: {
    type: Number,
    default: 0
  },
  totalValueDistributed: {
    type: String,
    default: '0'
  },
  
  // Smart Contract Information
  contractAddress: {
    type: String,
    lowercase: true,
    sparse: true
  },
  merkleRoot: {
    type: String,
    sparse: true
  },
  merkleProofs: {
    type: Map,
    of: [String],
    default: new Map()
  },
  
  // Admin Information
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    sparse: true
  },
  executedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    sparse: true
  },
  
  // Metadata
  tags: [String],
  notes: {
    type: String,
    maxlength: 2000
  }
}, {
  timestamps: true
});

// Indexes
airdropCampaignSchema.index({ status: 1, scheduledDate: 1 });
airdropCampaignSchema.index({ type: 1, status: 1 });
airdropCampaignSchema.index({ 'recipients.walletAddress': 1 });
airdropCampaignSchema.index({ createdBy: 1, createdAt: -1 });

// Virtual for completion percentage
airdropCampaignSchema.virtual('completionPercentage').get(function() {
  if (this.totalRecipients === 0) return 0;
  return Math.round((this.successfulSends / this.totalRecipients) * 100);
});

// Methods
airdropCampaignSchema.methods.addRecipient = function(walletAddress, allocation, weight = 1, userId = null) {
  // Check if recipient already exists
  const existingRecipient = this.recipients.find(r => r.walletAddress === walletAddress);
  if (existingRecipient) {
    throw new Error('Recipient already exists in this campaign');
  }
  
  this.recipients.push({
    walletAddress,
    userId,
    allocation,
    weight,
    status: 'pending'
  });
  
  this.totalRecipients = this.recipients.length;
  return this.save();
};

airdropCampaignSchema.methods.removeRecipient = function(walletAddress) {
  this.recipients = this.recipients.filter(r => r.walletAddress !== walletAddress);
  this.totalRecipients = this.recipients.length;
  return this.save();
};

airdropCampaignSchema.methods.updateRecipientStatus = function(walletAddress, status, transactionHash = null, errorMessage = null) {
  const recipient = this.recipients.find(r => r.walletAddress === walletAddress);
  if (!recipient) {
    throw new Error('Recipient not found');
  }
  
  recipient.status = status;
  if (transactionHash) {
    recipient.transactionHash = transactionHash;
    recipient.sentAt = new Date();
  }
  if (errorMessage) {
    recipient.errorMessage = errorMessage;
  }
  
  // Update statistics
  this.successfulSends = this.recipients.filter(r => r.status === 'sent' || r.status === 'claimed').length;
  this.failedSends = this.recipients.filter(r => r.status === 'failed').length;
  
  return this.save();
};

airdropCampaignSchema.methods.activate = function(adminId) {
  if (this.status !== 'draft' && this.status !== 'scheduled') {
    throw new Error('Campaign cannot be activated from current status');
  }
  
  this.status = 'active';
  this.startDate = new Date();
  this.executedBy = adminId;
  
  return this.save();
};

airdropCampaignSchema.methods.complete = function() {
  this.status = 'completed';
  this.endDate = new Date();
  
  // Calculate total value distributed
  const totalValue = this.recipients
    .filter(r => r.status === 'sent' || r.status === 'claimed')
    .reduce((sum, r) => sum + parseFloat(r.allocation), 0);
  
  this.totalValueDistributed = totalValue.toString();
  
  return this.save();
};

// Static methods
airdropCampaignSchema.statics.getActiveCampaigns = function() {
  return this.find({ 
    status: { $in: ['active', 'scheduled'] },
    $or: [
      { endDate: null },
      { endDate: { $gte: new Date() } }
    ]
  }).sort({ scheduledDate: 1, createdAt: -1 });
};

airdropCampaignSchema.statics.getCampaignStats = function(timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRecipients: { $sum: '$totalRecipients' },
        totalValue: { $sum: { $toDouble: '$totalValueDistributed' } }
      }
    }
  ]);
};

module.exports = mongoose.model('AirdropCampaign', airdropCampaignSchema);
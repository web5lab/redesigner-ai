import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    enum: ['coins', 'trophy', 'gift', 'zap', 'crown', 'sparkles', 'gem', 'star']
  },
  
  // Reward Configuration
  rewardType: {
    type: String,
    required: true,
    enum: ['tokens', 'nft', 'bonus', 'multiplier', 'jackpot', 'nothing']
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  tokenType: {
    type: String,
    enum: ['XXX', 'BNB', 'USDT', 'XXXHUB'],
    default: 'XXX'
  },
  
  // Probability and Positioning
  probability: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  position: {
    type: Number,
    required: true,
    min: 0,
    max: 7,
    unique: true
  },
  
  // Visual Configuration
  color: {
    type: String,
    required: true,
    default: 'from-yellow-400 via-yellow-500 to-amber-600'
  },
  glowEffect: {
    type: String,
    default: 'shadow-yellow-500/50'
  },
  
  // NFT Specific (if applicable)
  nftDetails: {
    contractAddress: {
      type: String,
      sparse: true
    },
    tokenId: {
      type: String,
      sparse: true
    },
    metadata: {
      name: String,
      description: String,
      image: String,
      attributes: [mongoose.Schema.Types.Mixed]
    },
    rarity: {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
      default: 'common'
    }
  },
  
  // Bonus Specific (if applicable)
  bonusDetails: {
    type: {
      type: String,
      enum: ['extra_spin', 'ticket_multiplier', 'token_boost'],
      sparse: true
    },
    multiplier: {
      type: Number,
      min: 1,
      sparse: true
    },
    duration: {
      type: Number, // in minutes
      sparse: true
    }
  },
  
  // Availability
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  maxClaims: {
    type: Number,
    default: null // null means unlimited
  },
  currentClaims: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Time Restrictions
  availableFrom: {
    type: Date,
    default: null
  },
  availableUntil: {
    type: Date,
    default: null
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
  
  // Statistics
  totalClaimed: {
    type: Number,
    default: 0,
    min: 0
  },
  totalValue: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes
rewardSchema.index({ isActive: 1, position: 1 });
rewardSchema.index({ rewardType: 1, isActive: 1 });
rewardSchema.index({ probability: -1 });

// Virtual for availability status
rewardSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  const timeAvailable = (!this.availableFrom || this.availableFrom <= now) &&
                       (!this.availableUntil || this.availableUntil >= now);
  const claimAvailable = !this.maxClaims || this.currentClaims < this.maxClaims;
  
  return this.isActive && timeAvailable && claimAvailable;
});

// Methods
rewardSchema.methods.claim = function() {
  if (!this.isAvailable) {
    throw new Error('Reward is not available for claiming');
  }
  
  this.currentClaims += 1;
  this.totalClaimed += 1;
  this.totalValue += this.value;
  
  return this.save();
};

rewardSchema.methods.resetClaims = function() {
  this.currentClaims = 0;
  return this.save();
};

// Static methods
rewardSchema.statics.getActiveRewards = function() {
  return this.find({ 
    isActive: true,
    $or: [
      { availableFrom: { $lte: new Date() } },
      { availableFrom: null }
    ],
    $or: [
      { availableUntil: { $gte: new Date() } },
      { availableUntil: null }
    ]
  }).sort({ position: 1 });
};

rewardSchema.statics.validateProbabilities = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, totalProbability: { $sum: '$probability' } } }
  ]);
};

export default mongoose.model('Reward', rewardSchema);
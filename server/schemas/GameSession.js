import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
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
  
  // Session Details
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  
  // Session State
  status: {
    type: String,
    enum: ['active', 'ended', 'expired', 'terminated'],
    default: 'active',
    index: true
  },
  
  // Game Statistics
  totalSpins: {
    type: Number,
    default: 0,
    min: 0
  },
  totalWinnings: {
    type: Number,
    default: 0,
    min: 0
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  ticketsUsed: {
    type: Number,
    default: 0,
    min: 0
  },
  ticketsPurchased: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Session Activities
  activities: [{
    type: {
      type: String,
      enum: ['login', 'spin', 'ticket_purchase', 'reward_claim', 'task_completion', 'logout'],
      required: true
    },
    details: mongoose.Schema.Types.Mixed,
    timestamp: {
      type: Date,
      default: Date.now
    },
    ipAddress: String,
    userAgent: String
  }],
  
  // Spin Results in Session
  spins: [{
    spinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SpinResult'
    },
    rewardType: String,
    winAmount: Number,
    timestamp: Date
  }],
  
  // Security Tracking
  securityFlags: [{
    type: {
      type: String,
      enum: ['suspicious_activity', 'multiple_ips', 'rapid_spins', 'unusual_pattern'],
      required: true
    },
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    resolved: {
      type: Boolean,
      default: false
    }
  }],
  
  // Device Information
  deviceInfo: {
    browser: String,
    os: String,
    device: String,
    screen: {
      width: Number,
      height: Number
    },
    timezone: String,
    language: String
  },
  
  // Network Information
  networkInfo: {
    provider: String,
    country: String,
    region: String,
    city: String,
    vpnDetected: {
      type: Boolean,
      default: false
    },
    proxyDetected: {
      type: Boolean,
      default: false
    }
  },
  
  // Performance Metrics
  performance: {
    averageResponseTime: {
      type: Number,
      default: 0
    },
    totalRequests: {
      type: Number,
      default: 0
    },
    errorCount: {
      type: Number,
      default: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  
  // Timestamps
  startTime: {
    type: Date,
    default: Date.now,
    index: true
  },
  endTime: {
    type: Date,
    sparse: true
  },
  lastActivity: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Indexes for performance
gameSessionSchema.index({ userId: 1, startTime: -1 });
gameSessionSchema.index({ status: 1, lastActivity: -1 });
gameSessionSchema.index({ sessionId: 1, status: 1 });

// Virtual for session duration
gameSessionSchema.virtual('duration').get(function() {
  const end = this.endTime || new Date();
  return Math.floor((end.getTime() - this.startTime.getTime()) / 1000); // in seconds
});

// Virtual for profit/loss
gameSessionSchema.virtual('profitLoss').get(function() {
  return this.totalWinnings - this.totalSpent;
});

// Pre-save middleware to generate session ID
gameSessionSchema.pre('save', function(next) {
  if (this.isNew && !this.sessionId) {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Methods
gameSessionSchema.methods.addActivity = function(type, details = {}, ipAddress = null, userAgent = null) {
  this.activities.push({
    type,
    details,
    timestamp: new Date(),
    ipAddress: ipAddress || this.ipAddress,
    userAgent: userAgent || this.userAgent
  });
  
  this.lastActivity = new Date();
  this.performance.totalRequests += 1;
  
  return this.save();
};

gameSessionSchema.methods.addSpin = function(spinResult) {
  this.spins.push({
    spinId: spinResult._id,
    rewardType: spinResult.rewardType,
    winAmount: spinResult.winAmount,
    timestamp: new Date()
  });
  
  this.totalSpins += 1;
  this.totalWinnings += spinResult.winAmount;
  this.ticketsUsed += 1;
  this.lastActivity = new Date();
  
  return this.save();
};

gameSessionSchema.methods.addTicketPurchase = function(amount, cost) {
  this.ticketsPurchased += amount;
  this.totalSpent += cost;
  this.lastActivity = new Date();
  
  this.addActivity('ticket_purchase', {
    amount,
    cost,
    totalTickets: this.ticketsPurchased
  });
  
  return this.save();
};

gameSessionSchema.methods.addSecurityFlag = function(type, description, severity = 'medium') {
  this.securityFlags.push({
    type,
    description,
    severity,
    timestamp: new Date(),
    resolved: false
  });
  
  return this.save();
};

gameSessionSchema.methods.endSession = function() {
  this.status = 'ended';
  this.endTime = new Date();
  
  this.addActivity('logout', {
    duration: this.duration,
    totalSpins: this.totalSpins,
    profitLoss: this.profitLoss
  });
  
  return this.save();
};

gameSessionSchema.methods.updatePerformance = function(responseTime) {
  const currentAvg = this.performance.averageResponseTime;
  const totalRequests = this.performance.totalRequests;
  
  this.performance.averageResponseTime = 
    (currentAvg * totalRequests + responseTime) / (totalRequests + 1);
  
  this.performance.totalRequests += 1;
  this.performance.lastActivity = new Date();
  this.lastActivity = new Date();
  
  return this.save();
};

// Static methods
gameSessionSchema.statics.getActiveSessions = function() {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  
  return this.find({
    status: 'active',
    lastActivity: { $gte: thirtyMinutesAgo }
  }).populate('userId', 'walletAddress username');
};

gameSessionSchema.statics.expireInactiveSessions = function() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  return this.updateMany(
    {
      status: 'active',
      lastActivity: { $lt: oneHourAgo }
    },
    {
      $set: { 
        status: 'expired',
        endTime: new Date()
      }
    }
  );
};

gameSessionSchema.statics.getUserSessionStats = function(userId, timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    { 
      $match: { 
        userId: mongoose.Types.ObjectId(userId),
        startTime: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        totalSpins: { $sum: '$totalSpins' },
        totalWinnings: { $sum: '$totalWinnings' },
        totalSpent: { $sum: '$totalSpent' },
        averageDuration: { $avg: '$duration' },
        totalDuration: { $sum: '$duration' }
      }
    }
  ]);
};

gameSessionSchema.statics.getSessionAnalytics = function(timeframe = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    { $match: { startTime: { $gte: startDate } } },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$startTime'
          }
        },
        sessions: { $sum: 1 },
        uniqueUsers: { $addToSet: '$userId' },
        totalSpins: { $sum: '$totalSpins' },
        totalRevenue: { $sum: '$totalSpent' },
        averageDuration: { $avg: '$duration' }
      }
    },
    {
      $project: {
        date: '$_id',
        sessions: 1,
        uniqueUsers: { $size: '$uniqueUsers' },
        totalSpins: 1,
        totalRevenue: 1,
        averageDuration: 1
      }
    },
    { $sort: { date: 1 } }
  ]);
};

export default mongoose.model('GameSession', gameSessionSchema);
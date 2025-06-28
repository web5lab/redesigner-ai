const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  // Basic Information
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  
  // Profile Information
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  avatar: {
    type: String,
    default: null
  },
  
  // Role and Permissions
  role: {
    type: String,
    required: true,
    enum: ['super_admin', 'admin', 'moderator', 'support'],
    default: 'admin',
    index: true
  },
  permissions: [{
    module: {
      type: String,
      required: true,
      enum: [
        'users',
        'rewards',
        'pricing',
        'airdrops',
        'referrals',
        'social_tasks',
        'spin_board',
        'transactions',
        'analytics',
        'settings',
        'admin_management'
      ]
    },
    actions: [{
      type: String,
      enum: ['read', 'create', 'update', 'delete', 'execute']
    }]
  }],
  
  // Security
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    sparse: true
  },
  lastPasswordChange: {
    type: Date,
    default: Date.now
  },
  passwordResetToken: {
    type: String,
    sparse: true
  },
  passwordResetExpires: {
    type: Date,
    sparse: true
  },
  
  // Session Management
  activeSessions: [{
    sessionId: {
      type: String,
      required: true
    },
    ipAddress: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastActivity: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // Activity Tracking
  lastLogin: {
    type: Date,
    sparse: true
  },
  lastLoginIp: {
    type: String,
    sparse: true
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    sparse: true
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    sparse: true
  },
  
  // Audit Trail
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    sparse: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    sparse: true
  },
  
  // Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      browser: {
        type: Boolean,
        default: true
      },
      security: {
        type: Boolean,
        default: true
      }
    }
  }
}, {
  timestamps: true
});

// Indexes
adminSchema.index({ email: 1 });
adminSchema.index({ username: 1 });
adminSchema.index({ role: 1, isActive: 1 });
adminSchema.index({ lastLogin: -1 });

// Virtual for full name
adminSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
adminSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
adminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    
    // Update password change timestamp
    if (!this.isNew) {
      this.lastPasswordChange = new Date();
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Methods
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.hasPermission = function(module, action) {
  if (this.role === 'super_admin') return true;
  
  const permission = this.permissions.find(p => p.module === module);
  return permission && permission.actions.includes(action);
};

adminSchema.methods.addSession = function(sessionId, ipAddress, userAgent) {
  this.activeSessions.push({
    sessionId,
    ipAddress,
    userAgent,
    createdAt: new Date(),
    lastActivity: new Date(),
    isActive: true
  });
  
  // Keep only last 5 sessions
  if (this.activeSessions.length > 5) {
    this.activeSessions = this.activeSessions.slice(-5);
  }
  
  return this.save();
};

adminSchema.methods.updateSessionActivity = function(sessionId) {
  const session = this.activeSessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.lastActivity = new Date();
    return this.save();
  }
  return Promise.resolve(this);
};

adminSchema.methods.deactivateSession = function(sessionId) {
  const session = this.activeSessions.find(s => s.sessionId === sessionId);
  if (session) {
    session.isActive = false;
    return this.save();
  }
  return Promise.resolve(this);
};

adminSchema.methods.recordLogin = function(ipAddress) {
  this.lastLogin = new Date();
  this.lastLoginIp = ipAddress;
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  return this.save();
};

adminSchema.methods.recordFailedLogin = function() {
  this.loginAttempts += 1;
  
  // Lock account after 5 failed attempts for 30 minutes
  if (this.loginAttempts >= 5) {
    const lockTime = new Date();
    lockTime.setMinutes(lockTime.getMinutes() + 30);
    this.lockUntil = lockTime;
  }
  
  return this.save();
};

adminSchema.methods.generatePasswordResetToken = function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  return resetToken;
};

// Static methods
adminSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

adminSchema.statics.findByUsername = function(username) {
  return this.findOne({ username: username.toLowerCase() });
};

adminSchema.statics.getActiveAdmins = function() {
  return this.find({ isActive: true }).select('-password -twoFactorSecret');
};

adminSchema.statics.getAdminStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        active: {
          $sum: {
            $cond: ['$isActive', 1, 0]
          }
        }
      }
    }
  ]);
};

// Remove password from JSON output
adminSchema.methods.toJSON = function() {
  const adminObject = this.toObject();
  delete adminObject.password;
  delete adminObject.twoFactorSecret;
  delete adminObject.passwordResetToken;
  return adminObject;
};

export default mongoose.model('Admin', adminSchema);
# MongoDB Schemas for Web3 Spin Game Platform

This directory contains all MongoDB schemas required for the Node.js backend of the Web3 spin game platform.

## Schema Overview

### Core Schemas

1. **User.js** - User management and game statistics
   - Wallet information and authentication
   - Game statistics (spins, winnings, tickets)
   - Referral system integration
   - Social task completion tracking
   - VIP status and user levels

2. **SpinResult.js** - Individual spin game results
   - Spin outcomes and rewards
   - Transaction tracking
   - Verification and audit trail
   - Random seed storage for fairness

3. **Reward.js** - Configurable game rewards
   - Reward types (tokens, NFTs, bonuses)
   - Probability and positioning on wheel
   - Visual configuration (colors, icons)
   - Availability and claim limits

4. **Transaction.js** - Blockchain transaction tracking
   - All financial transactions
   - Gas fees and network information
   - Transaction status and confirmations
   - USD value tracking for reporting

### Feature Schemas

5. **SocialTask.js** - Social media task management
   - Platform-specific tasks (Twitter, Telegram, etc.)
   - Verification methods and completion tracking
   - Reward distribution
   - User submission and approval workflow

6. **AirdropCampaign.js** - Token/NFT airdrop campaigns
   - Campaign configuration and scheduling
   - Recipient management
   - Distribution strategies (equal, weighted, tiered)
   - Merkle tree support for gas optimization

7. **ReferralSystem.js** - Referral program management
   - Referrer and referred user tracking
   - Qualification requirements and progress
   - Milestone rewards and achievements
   - Reward claim status

8. **GameSession.js** - User session tracking
   - Real-time session monitoring
   - Security and fraud detection
   - Performance metrics
   - Activity logging

9. **Admin.js** - Administrative user management
   - Role-based access control
   - Permission system
   - Security features (2FA, session management)
   - Audit trail for admin actions

## Key Features

### Security & Verification
- Cryptographic verification for spin results
- Session management and fraud detection
- IP tracking and suspicious activity monitoring
- Secure password hashing and 2FA support

### Scalability
- Optimized indexes for high-performance queries
- Aggregation pipelines for analytics
- Efficient data structures for large datasets
- Pagination support for large collections

### Audit Trail
- Complete transaction history
- Admin action logging
- User activity tracking
- Immutable spin result records

### Analytics Support
- User behavior analytics
- Financial reporting
- Performance metrics
- Real-time statistics

## Usage

```javascript
const { User, SpinResult, Reward, Transaction } = require('./schemas');

// Example: Create a new user
const user = new User({
  walletAddress: '0x742d35Cc6634C0532925a3b8D96698b0C03C4532',
  walletProvider: 'metamask',
  network: 'BSC'
});

// Example: Record a spin result
const spinResult = new SpinResult({
  userId: user._id,
  walletAddress: user.walletAddress,
  rewardId: reward._id,
  rewardName: 'Jackpot',
  rewardType: 'tokens',
  winAmount: 5000,
  wheelPosition: 6,
  randomSeed: 'crypto_random_seed_here'
});
```

## Database Indexes

All schemas include optimized indexes for:
- User lookup by wallet address
- Transaction history queries
- Real-time session tracking
- Analytics and reporting
- Admin dashboard performance

## Environment Setup

Make sure to install required dependencies:

```bash
npm install mongoose bcryptjs
```

## Schema Relationships

- Users have many SpinResults, Transactions, GameSessions
- SpinResults reference Rewards and Users
- Transactions link to SpinResults, SocialTasks, AirdropCampaigns
- ReferralSystem connects Users (referrer/referred)
- SocialTasks track completion by Users
- AirdropCampaigns target multiple Users
- Admins manage all administrative entities

This comprehensive schema structure supports all features of the XXX Gaming Hub platform while maintaining data integrity, security, and performance.
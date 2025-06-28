// Central export file for all MongoDB schemas
const User = require('./User');
const SpinResult = require('./SpinResult');
const Reward = require('./Reward');
const Transaction = require('./Transaction');
const SocialTask = require('./SocialTask');
const AirdropCampaign = require('./AirdropCampaign');
const ReferralSystem = require('./ReferralSystem');
const Admin = require('./Admin');
const GameSession = require('./GameSession');

module.exports = {
  User,
  SpinResult,
  Reward,
  Transaction,
  SocialTask,
  AirdropCampaign,
  ReferralSystem,
  Admin,
  GameSession
};
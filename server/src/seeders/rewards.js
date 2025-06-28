import mongoose from 'mongoose';
import { Reward } from '../../schemas/index.js';
import connectDB from '../config/db.js';

const defaultRewards = [
  {
    name: '500 COINS',
    description: 'Standard token reward',
    icon: 'coins',
    rewardType: 'tokens',
    value: 500,
    probability: 25,
    position: 0,
    color: 'from-yellow-400 via-yellow-500 to-amber-600',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: 'NOTHING',
    description: 'No reward',
    icon: 'star',
    rewardType: 'nothing',
    value: 0,
    probability: 20,
    position: 1,
    color: 'from-gray-600 via-gray-700 to-gray-800',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: '1,000 COINS',
    description: 'Medium token reward',
    icon: 'coins',
    rewardType: 'tokens',
    value: 1000,
    probability: 20,
    position: 2,
    color: 'from-green-400 via-emerald-500 to-green-600',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: 'BONUS SPIN',
    description: 'Extra spin opportunity',
    icon: 'gift',
    rewardType: 'bonus',
    value: 0,
    probability: 15,
    position: 3,
    color: 'from-purple-500 via-violet-600 to-purple-700',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: '250 COINS',
    description: 'Small token reward',
    icon: 'coins',
    rewardType: 'tokens',
    value: 250,
    probability: 15,
    position: 4,
    color: 'from-orange-400 via-orange-500 to-red-500',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: 'RARE NFT',
    description: 'Exclusive collectible NFT',
    icon: 'gem',
    rewardType: 'nft',
    value: 0,
    probability: 3,
    position: 5,
    color: 'from-pink-500 via-rose-600 to-pink-700',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: '5,000 COINS',
    description: 'Jackpot reward',
    icon: 'crown',
    rewardType: 'jackpot',
    value: 5000,
    probability: 1,
    position: 6,
    color: 'from-cyan-400 via-blue-500 to-indigo-600',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    name: '2X MULTIPLIER',
    description: 'Double next reward',
    icon: 'sparkles',
    rewardType: 'multiplier',
    value: 0,
    probability: 1,
    position: 7,
    color: 'from-emerald-400 via-teal-500 to-cyan-600',
    isActive: true,
    createdBy: new mongoose.Types.ObjectId()
  }
];

const seedRewards = async () => {
  try {
    await connectDB();
    
    // Clear existing rewards
    await Reward.deleteMany({});
    
    // Insert default rewards
    await Reward.insertMany(defaultRewards);
    
    console.log('✅ Rewards seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding rewards:', error);
    process.exit(1);
  }
};

seedRewards();
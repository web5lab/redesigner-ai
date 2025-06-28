import mongoose from 'mongoose';
import { SocialTask } from '../../schemas/index.js';
import connectDB from '../config/db.js';

const defaultTasks = [
  {
    title: 'Follow XXX Gaming Hub on Twitter',
    description: 'Follow our official Twitter account for updates and announcements',
    platform: 'twitter',
    action: 'follow',
    url: 'https://twitter.com/xxxgaminghub',
    reward: {
      type: 'tokens',
      amount: 100,
      tokenType: 'XXX'
    },
    isActive: true,
    priority: 10,
    featured: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Join Telegram Community',
    description: 'Join our Telegram group to chat with other players and get exclusive updates',
    platform: 'telegram',
    action: 'join',
    url: 'https://t.me/xxxgaminghub',
    reward: {
      type: 'spins',
      amount: 3
    },
    isActive: true,
    priority: 9,
    featured: true,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Like Latest Tweet',
    description: 'Like our latest announcement tweet to show your support',
    platform: 'twitter',
    action: 'like',
    url: 'https://twitter.com/xxxgaminghub/status/latest',
    reward: {
      type: 'tickets',
      amount: 2
    },
    isActive: true,
    priority: 5,
    featured: false,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Subscribe to YouTube Channel',
    description: 'Subscribe to our YouTube channel for gaming tutorials and updates',
    platform: 'youtube',
    action: 'subscribe',
    url: 'https://youtube.com/@xxxgaminghub',
    reward: {
      type: 'tokens',
      amount: 250,
      tokenType: 'XXX'
    },
    isActive: true,
    priority: 8,
    featured: false,
    createdBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Join Discord Server',
    description: 'Join our Discord community for real-time chat and exclusive events',
    platform: 'discord',
    action: 'join',
    url: 'https://discord.gg/xxxgaminghub',
    reward: {
      type: 'tokens',
      amount: 150,
      tokenType: 'XXX'
    },
    isActive: true,
    priority: 7,
    featured: false,
    createdBy: new mongoose.Types.ObjectId()
  }
];

const seedSocialTasks = async () => {
  try {
    await connectDB();
    
    // Clear existing tasks
    await SocialTask.deleteMany({});
    
    // Insert default tasks
    await SocialTask.insertMany(defaultTasks);
    
    console.log('✅ Social tasks seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding social tasks:', error);
    process.exit(1);
  }
};

seedSocialTasks();
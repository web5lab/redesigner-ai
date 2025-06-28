// app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/game.js';
import referralRoutes from './routes/referral.js';
import socialRoutes from './routes/social.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Trust proxy for getting real IP addresses
app.set('trust proxy', true);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/admin', adminRoutes);

export default app;

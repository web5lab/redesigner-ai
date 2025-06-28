import app from './src/app.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
dotenv.config();



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();

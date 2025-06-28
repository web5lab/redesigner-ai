// app.js
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

export default app;

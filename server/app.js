import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';
import adminRouter from './routes/admin.js';
import contactRouter from './routes/contact.js';

const app = express();

// Reuse Mongoose connection across serverless invocations
let isDbConnected = false;
export async function connectDB() {
  if (isDbConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chemx';
  try {
    await mongoose.connect(MONGODB_URI);
    isDbConnected = true;
    console.log('✔ MongoDB connected');
  } catch (err) {
    console.error('✖ MongoDB connection error:', err.message);
  }
}

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Ensure DB is connected for API requests
app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

// API routes
app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

export default app;

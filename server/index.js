import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chemx';

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// API routes
app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✔ MongoDB connected: ${MONGODB_URI}`);
  } catch (err) {
    console.error('✖ MongoDB connection failed:', err.message);
    console.error('  Make sure MongoDB is running, or set MONGODB_URI in .env');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✔ Chem-X API server running at http://localhost:${PORT}`);
  });
}

start();

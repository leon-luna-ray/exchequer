import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { requireAuth } from './middleware/authMiddleware.mjs';

import authRoutes from './routes/auth.mjs';
import budgetRoutes from './routes/budget.mjs';

import './loadEnvironment.mjs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;
const API_BASE_PATH = '/api/v1';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'exchequer',
    });
    console.log(`📀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

// Routes
app.use(`${API_BASE_PATH}/auth`, authRoutes);
app.use(`${API_BASE_PATH}/budget`, requireAuth, budgetRoutes);

// Static
app.use(express.static('./client/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

connectDB();

app.listen(PORT, () => {
  console.log(`📡 Server is running on port: ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import path from 'path';
import './loadEnvironment.mjs';
import posts from './routes/post.mjs';
import authRoutes from './routes/auth.mjs';
import protectedRoutes from './routes/protected.mjs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'sticky_notes',
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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/protected', protectedRoutes);
app.use('/api/v1/posts', posts);

// Static
app.use(express.static('./client/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

connectDB();

app.listen(PORT, () => {
  console.log(`📡 Server is running on port: ${PORT}`);
});

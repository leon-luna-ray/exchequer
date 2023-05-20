import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));

// routes
// app.use(require('./routes/api.js'));

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`
📡 The app is listening at http://localhost:${PORT}
      `);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
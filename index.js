import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import userRouter from './routes/user.routes.js'
import transactionRouter from './routes/transaction.routes.js'

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));

// Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/transactions', transactionRouter)

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
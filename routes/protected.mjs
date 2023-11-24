import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Protected route
router.get('/protected/dashboard', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secret_key', (err) => {
    if (err) {
      res.sendStatus;
    } else {
      res.json({ message: 'Welcome to the dashboard!' });
      console.log('🌈🌈 HELLO FROM PROTECTED ROUTE 🌈🌈')
    }
  });
});

export default router;

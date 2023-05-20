import express from 'express';
import {
  getTransactions,
  getTransactionDetail,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller.js';

const router = express.Router();

router.route('/').get(getTransactions);
router.route('/:id').post(getTransactionDetail);
router.route('/').post(createTransaction);
router.route('/:id').patch(updateTransaction);
router.route('/:id').delete(deleteTransaction);

export default router;

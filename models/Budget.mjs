import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  description: String,
  amount: Number,
  currency: String,
});

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  title: String,
  description: String,
  localCurrency: String,
  transactions: [transactionSchema],
});

export default mongoose.model('Budget', budgetSchema);

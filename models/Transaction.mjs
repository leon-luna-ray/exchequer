import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },
  createdAt: { type: Date, default: Date.now },
  description: String,
  amount: Number,
  localCurrency: String,
  homeCurrency: String,
  location: String,
  category: String,
});

export default mongoose.model('Transaction', transactionSchema);

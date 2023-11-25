import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  description: String,
  amount: Number,
  localCurrency: String,
  homeCurrency: String,
  location: String,
  category: String,
});

export default mongoose.model('Expense', expenseSchema);

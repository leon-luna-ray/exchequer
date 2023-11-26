import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  title: String,
  description: String,
  localCurrency: String,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});

export default mongoose.model('Budget', budgetSchema);

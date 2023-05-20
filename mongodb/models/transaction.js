import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Enter a name for transaction',
  },
  value: {
    type: Number,
    required: 'Enter an amount',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const transactionModel = mongoose.model('Transaction', TransactionSchema);

export default transactionModel;

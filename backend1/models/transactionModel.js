const mongoose = require('mongoose');

// Define your Transaction schema
const transactionSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  amount: Number,
  status: String,
  trackingId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports=Transaction

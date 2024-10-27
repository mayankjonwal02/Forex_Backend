// src/models/FundedAccount.js
const mongoose = require('mongoose');

const fundedAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  initialBalance: { type: Number, required: true },
  currentBalance: { type: Number, default: 0 },
  fundingProgram: { type: String, required: true },
  activeTrades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }],
  tradingRules: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('FundedAccount', fundedAccountSchema);

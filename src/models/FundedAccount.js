// src/models/FundedAccount.js
const mongoose = require('mongoose');

const fundedAccountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  initialBalance: { type: Number, required: true },
  currentBalance: { type: Number, default: 0 },
  fundingProgram: { type: String, required: true },
  activeTrades: [{ type: String  }],
  tradingRules: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('FundedAccount', fundedAccountSchema);

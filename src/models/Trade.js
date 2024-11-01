// src/models/Trade.js
const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    asset: { type: String, required: true },
    buyPrice: Number,
    sellPrice: Number,
    tradeVolume: Number,
    profitOrLoss: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);

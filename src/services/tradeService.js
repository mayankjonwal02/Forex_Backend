// src/services/tradeService.js
const Trade = require("../models/Trade");

const createTrade = async (tradeData) => {
  const trade = new Trade(tradeData);
  return await trade.save();
};

const getTradeHistoryByUser = async (userId) => {
  console.log(userId);

  return await Trade.find({ userId: userId }).sort({ timestamp: -1 });
};

const getTradeById = async (tradeId) => {
  return await Trade.findById(tradeId);
};

module.exports = { createTrade, getTradeHistoryByUser, getTradeById };

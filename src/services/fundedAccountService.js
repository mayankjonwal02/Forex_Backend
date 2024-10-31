// src/services/fundedAccountService.js
const FundedAccount = require("../models/FundedAccount");

const createFundedAccount = async (accountData) => {
  const account = new FundedAccount(accountData);
  return await account.save();
};

const getFundedAccountById = async (accountId) => {
  return await FundedAccount.findById(accountId).populate("activeTrades");
};

const depositFunds = async (accountId, amount) => {
  return await FundedAccount.findByIdAndUpdate(
    accountId,
    { $inc: { currentBalance: amount } },
    { new: true }
  );
};

const withdrawFunds = async (accountId, amount) => {
  return await FundedAccount.findByIdAndUpdate(
    accountId,
    { $inc: { currentBalance: -amount } },
    { new: true }
  );
};

module.exports = {
  createFundedAccount,
  getFundedAccountById,
  depositFunds,
  withdrawFunds,
};

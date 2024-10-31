// src/routes/fundedAccountRoutes.js
const express = require("express");
const router = express.Router();
const fundedAccountService = require("../services/fundedAccountService");

router.post("/create", async (req, res) => {
  try {
    const account = await fundedAccountService.createFundedAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:accountId", async (req, res) => {
  try {
    const account = await fundedAccountService.getFundedAccountById(
      req.params.accountId
    );
    if (!account) {
      return res.status(404).json({ error: "Funded account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:accountId/deposit", async (req, res) => {
  try {
    const { amount } = req.body;
    const account = await fundedAccountService.depositFunds(
      req.params.accountId,
      amount
    );
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:accountId/withdraw", async (req, res) => {
  try {
    const { amount } = req.body;
    const account = await fundedAccountService.withdrawFunds(
      req.params.accountId,
      amount
    );
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

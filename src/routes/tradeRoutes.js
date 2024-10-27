// src/routes/tradeRoutes.js
const express = require('express');
const router = express.Router();
const tradeService = require('../services/tradeService');

router.post('/create', async (req, res) => {
  try {
    const trade = await tradeService.createTrade(req.body);
    res.status(201).json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId/history', async (req, res) => {
  try {
    const trades = await tradeService.getTradeHistoryByUser(req.params.userId);
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:tradeId', async (req, res) => {
  try {
    const trade = await tradeService.getTradeById(req.params.tradeId);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
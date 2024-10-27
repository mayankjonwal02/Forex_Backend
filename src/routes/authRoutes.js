// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/signup', async (req, res) => {
  try {
    const { email, traderId } = req.body;
    const user = await authService.registerUser({ email, traderId });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, traderId, otp } = req.body;
    const user = await authService.loginUser(email, traderId, otp);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const chatService = require('../services/chatService');

router.post('/signup', async (req, res) => {
  try {
    const { email, traderId, mobileNumber, username } = req.body;
    const user = await authService.registerUser({ email, traderId, mobileNumber, username });
    res.status(201).json({ message: 'OTP sent to your email', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;  // Only require email
    const user = await authService.loginUser(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await authService.getUserById(userId);

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP after verification
    user.otp = undefined;
    await user.save();

    // Add user's username to all existing chat groups
    await chatService.addUserToAllGroups(user.username);

    res.json({ message: 'Signup successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
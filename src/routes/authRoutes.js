const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const chatService = require('../services/chatService');
const { authenticate } = require('../middlewares/authMiddleware'); // Import the authenticate middleware

// Signup route with username
router.post('/signup', async (req, res) => {
  try {
    const { email, username, traderId, mobileNumber } = req.body;
    const user = await authService.registerUser({ email, username, traderId, mobileNumber });
    res.status(201).json({ message: 'User registered successfully. OTP has been sent to your email.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route only with OTP
router.post('/login', async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await authService.loginUser(otp);
    if (!user) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to send OTP to user for login
router.post('/send-otp', async (req, res) => {
  try {
    const { userId } = req.body;
    await authService.sendOtp(userId); // Send OTP
    res.json({ otpSent: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the list of all participants (usernames)
router.get('/participants', async (req, res) => {
  try {
    const participants = await authService.getAllParticipants();
    res.json({ participants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

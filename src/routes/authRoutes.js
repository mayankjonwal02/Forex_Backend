const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const chatService = require('../services/chatService');
const { authenticate } = require('../middlewares/authMiddleware'); // Import the authenticate middleware

<<<<<<< HEAD
// Signup route with username
router.post('/signup', async (req, res) => {
  try {
    const { email, username, traderId, mobileNumber } = req.body;
    const user = await authService.registerUser({ email, username, traderId, mobileNumber });
    res.status(201).json({ message: 'User registered successfully. OTP has been sent to your email.', user });
=======
// Signup route (no authentication needed)
router.post('/signup', async (req, res) => {
  try {
    const { email, traderId, username, password } = req.body; // Require password in signup
    const user = await authService.registerUser({ email, traderId, username, password });
    res.status(201).json({ message: 'OTP sent to your email', userId: user._id });
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

<<<<<<< HEAD
// Login route only with OTP
router.post('/login', async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await authService.loginUser(otp);
=======
// Login route (no authentication needed)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Require password in login
    const user = await authService.loginUser(email, password);
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
    if (!user) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

<<<<<<< HEAD
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
=======
// Verify OTP route (authentication needed)
router.post('/verify-otp', authenticate, async (req, res) => { // Apply middleware here
  try {
    const { userId, otp } = req.body;
    const user = await authService.getUserById(userId);

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.otp = undefined; // Clear OTP after verification
    await user.save();

    await chatService.addUserToAllGroups(user.username);

    res.json({ message: 'Signup successful', user });
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');

// Admin signup
router.post('/signup', async (req, res) => {
  try {
    const { email, traderId, phoneNumber } = req.body;
    const admin = await adminService.registerAdmin({ email, traderId, phoneNumber });
    res.status(201).json({ message: 'OTP sent to your email', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await adminService.loginAdmin(email, otp);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials or OTP expired' });
    }

    res.json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

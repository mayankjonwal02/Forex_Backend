// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');

// Route for admin signup
router.post('/signup', async (req, res) => {
  try {
    const { email, traderId, phoneNumber } = req.body;
    const admin = await adminService.registerAdmin({ email, traderId, phoneNumber });
    res.status(201).json({ message: 'OTP sent to your email', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for admin login
router.post('/login', async (req, res) => {
  try {
    const { email, otp } = req.body; // Require email and OTP for login
    const admin = await adminService.loginAdmin(email, otp);
    res.json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

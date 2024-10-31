const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');

// Admin signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminService.signupAdmin(email, password);

    res.status(201).json({ message: 'Signup successful', admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

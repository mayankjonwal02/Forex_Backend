// src/controllers/mycontroller.js
const express = require('express');
const router = express.Router();

const authRoutes = require('../routes/authRoutes');
const chatRoutes = require('../routes/chatRoutes');
//const courseRoutes = require('../routes/courseRoutes');
const fundedAccountRoutes = require('../routes/fundedAccountRoutes');
const tradeRoutes = require('../routes/tradeRoutes');
//const analysisRoutes = require('../routes/analysis'); 
const chatService = require('../services/chatService'); // Import chat service

// Function to set the io instance in chat service
const setSocketIo = (io) => {
  chatService.setIoInstance(io); // Set io instance in chat service
};

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
//router.use('/courses', courseRoutes);
router.use('/funded-account', fundedAccountRoutes);
router.use('/trades', tradeRoutes);
//router.use('/analysis', analysisRoutes); 

module.exports = router; // Default export for router
module.exports.setSocketIo = setSocketIo; // Named export for setSocketIo
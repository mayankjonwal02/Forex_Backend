const express = require('express');
const router = express.Router();

const authRoutes = require('../routes/authRoutes');
const chatRoutes = require('../routes/chatRoutes');
const courseRoutes = require('../routes/courseRoutes');
const fundedAccountRoutes = require('../routes/fundedAccountRoutes');
const tradeRoutes = require('../routes/tradeRoutes');

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/courses', courseRoutes);
router.use('/funded-account', fundedAccountRoutes);
router.use('/trades', tradeRoutes);

module.exports = router;
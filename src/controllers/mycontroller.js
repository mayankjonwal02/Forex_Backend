const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const authRoutes = require("../routes/authRoutes");
const chatRoutes = require("../routes/chatRoutes");
//const courseRoutes = require("../routes/courseRoutes");
const fundedAccountRoutes = require("../routes/fundedAccountRoutes");
const tradeRoutes = require("../routes/tradeRoutes");
//const analysisRoutes = require("../routes/analysis");
const chatService = require("../services/chatService");
//const adminRoutes = require("../routes/adminRoutes");

const setSocketIo = (io) => {
  chatService.setIoInstance(io);
};


router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
//router.use("/courses", courseRoutes);
router.use("/funded-account", fundedAccountRoutes);
router.use("/trades", tradeRoutes);
//router.use("/analysis", analysisRoutes);
//router.use("/admin", adminRoutes);

=======
const authRoutes = require('../routes/authRoutes');
const chatRoutes = require('../routes/chatRoutes');
const courseRoutes = require('../routes/courseRoutes');
const fundedAccountRoutes = require('../routes/fundedAccountRoutes');
const tradeRoutes = require('../routes/tradeRoutes');
const analysisRoutes = require('../routes/analysis');
const chatService = require('../services/chatService');
const adminRoutes = require('../routes/adminRoutes'); 

const setSocketIo = (io) => {
  chatService.setIoInstance(io);
};

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/courses', courseRoutes);
router.use('/funded-account', fundedAccountRoutes);
router.use('/trades', tradeRoutes);
router.use('/analysis', analysisRoutes);
router.use('/admin', adminRoutes); 

>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
module.exports = router;
module.exports.setSocketIo = setSocketIo;

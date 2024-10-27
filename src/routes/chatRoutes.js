// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatService = require('../services/chatService');

router.post('/group/create', async (req, res) => {
  try {
    const { admin_id, group_name, participants } = req.body;
    const group = await chatService.createChatGroup(admin_id, group_name, participants);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/group/:groupId/message', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { senderId, message } = req.body;
    const chat = await chatService.addMessageToChat(groupId, senderId, message);
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/group/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const chat = await chatService.getChatById(groupId);
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
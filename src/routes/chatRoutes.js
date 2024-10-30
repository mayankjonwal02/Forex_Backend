const express = require('express');
const router = express.Router();
const chatService = require('../services/chatService');

router.post('/group/create', async (req, res) => {
  try {
    const { admin_id, group_name } = req.body;
    const group = await chatService.createChatGroup(admin_id, group_name);

    // Send response without the participants array
    res.status(201).json({
      _id: group._id,
      adminId: group.adminId,
      groupName: group.groupName,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    });
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
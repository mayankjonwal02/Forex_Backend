const express = require('express');
const router = express.Router();
const chatService = require('../services/chatService');
const User = require('../models/User'); 

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

    // Find the user by senderId to check their role
    const user = await User.findById(senderId); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can send messages' });
    }

    // If the user is an admin, add the message to the chat
    const chat = await chatService.addMessageToChat(groupId, user.username, message); 
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
router.get('/group/:groupId/participants', async (req, res) => {
  try {
    const { groupId } = req.params;
    const participants = await chatService.getParticipantsOfGroup(groupId);
    
    // Return the participants
    res.json({ participants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;

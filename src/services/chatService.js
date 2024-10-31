// src/services/chatService.js
const Chat = require('../models/Chat');

const createChatGroup = async (adminId, groupName, participants) => {
  const chatGroup = new Chat({ adminId, groupName, participants });
  return await chatGroup.save();
};

const addMessageToChat = async (groupId, senderId, username, message) => {
  try {
    return await Chat.findByIdAndUpdate(
      groupId,
      { $push: { messages: { senderId, senderUsername: username, message } } },
      { new: true }
    );
  } catch (error) {
    throw new Error(`Error adding message to chat: ${error.message}`);
  }
};



const getChatById = async (groupId) => {
  return await Chat.findById(groupId).populate('participants').populate('messages.senderId');
};

module.exports = { createChatGroup, addMessageToChat, getChatById };

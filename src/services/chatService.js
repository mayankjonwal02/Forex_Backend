// src/services/chatService.js
const Chat = require('../models/Chat');

const createChatGroup = async (adminId, groupName, participants) => {
  const chatGroup = new Chat({ adminId, groupName, participants });
  return await chatGroup.save();
};

const addMessageToChat = async (groupId, senderId, message) => {
  return await Chat.findByIdAndUpdate(
    groupId,
    { $push: { messages: { senderId, message } } },
    { new: true }
  );
};

const getChatById = async (groupId) => {
  return await Chat.findById(groupId)
    .populate('participants')
    .populate('messages.senderId');
};

// Setting up Socket.IO instance (placeholder, ensure this function is correctly defined)
let io;
const setIoInstance = (ioInstance) => {
  io = ioInstance;
};

module.exports = { createChatGroup, addMessageToChat, getChatById, setIoInstance };
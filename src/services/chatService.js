// src/services/chatService.js
const Chat = require('../models/Chat');
const User = require('../models/User'); // Import User model

const createChatGroup = async (adminId, groupName) => {
  try {
    // Fetch all users to add as participants
    const users = await User.find({}, '_id'); // Only fetch `_id` to optimize the query
    const participantIds = users.map(user => user._id);

    // Create the chat group with all users as participants
    const chatGroup = new Chat({
      adminId,
      groupName,
      participants: participantIds, // Add all user IDs to participants
    });

    // Save and return the chat group
    return await chatGroup.save();
  } catch (error) {
    throw new Error(`Error creating chat group: ${error.message}`);
  }
};

const addMessageToChat = async (groupId, senderId, message) => {
  try {
    return await Chat.findByIdAndUpdate(
      groupId,
      { $push: { messages: { senderId, message } } },
      { new: true }
    );
  } catch (error) {
    throw new Error(`Error adding message to chat: ${error.message}`);
  }
};

const getChatById = async (groupId) => {
  try {
    return await Chat.findById(groupId)
      .populate('participants') // Populate participants for more detailed user info
      .populate('messages.senderId'); // Populate sender details for messages
  } catch (error) {
    throw new Error(`Error fetching chat by ID: ${error.message}`);
  }
};

// Setting up Socket.IO instance (placeholder, ensure this function is correctly defined)
let io;
const setIoInstance = (ioInstance) => {
  io = ioInstance;
};

module.exports = { createChatGroup, addMessageToChat, getChatById, setIoInstance };

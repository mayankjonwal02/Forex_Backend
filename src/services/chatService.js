// src/services/chatService.js
const Chat = require("../models/Chat");
const Admin = require("../models/Admin"); // Import the Admin model

const createChatGroup = async (adminId, groupName, participants = []) => {
  const chatGroup = new Chat({ adminId, groupName, participants });
  return await chatGroup.save();
};

const addMessageToChat = async (groupId, senderId, message) => {
  try {
    const chatGroup = await Chat.findById(groupId);

    // Check if sender is the admin of the group
    if (chatGroup.adminId !== senderId) {
      throw new Error("Only the admin can send messages in this group.");
    }

    // Add the message to the chat
    chatGroup.messages.push({ senderId, message });
    await chatGroup.save();

    return chatGroup;
  } catch (error) {
    throw new Error(`Error adding message to chat: ${error.message}`);
  }
};

const getChatById = async (groupId) => {
  return await Chat.findById(groupId)
    .populate("participants")
    .populate("messages.senderId");
};

module.exports = { createChatGroup, addMessageToChat, getChatById };

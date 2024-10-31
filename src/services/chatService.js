// src/services/chatService.js
const Chat = require("../models/Chat");
const User = require("../models/User"); // Import User model

const createChatGroup = async (adminId, groupName) => {
  try {
    // Fetch all users to add as participants
    const users = await User.find({}, "_id"); // Only fetch `_id` to optimize the query
    const participantIds = users.map((user) => user._id);

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
  try {
    return await Chat.findById(groupId).populate("participants");
    //t .populate('messages.senderId');
  } catch (error) {
    throw new Error(`Error fetching chat by ID: ${error.message}`);
  }
};

let io;
const setIoInstance = (ioInstance) => {
  io = ioInstance;
};
const addUserToAllGroups = async (username) => {
  try {
    // Find all chat groups and add the new user's username as a participant
    const chatGroups = await Chat.find();

    const updatePromises = chatGroups.map((group) => {
      if (!group.participants.includes(username)) {
        return Chat.findByIdAndUpdate(
          group._id,
          { $push: { participants: username } },
          { new: true }
        );
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
  } catch (error) {
    throw new Error(`Error adding username to all groups: ${error.message}`);
  }
};

const getParticipantsOfGroup = async (groupId) => {
  try {
    const chatGroup = await Chat.findById(groupId).select("participants");
    return chatGroup ? chatGroup.participants : [];
  } catch (error) {
    throw new Error(
      `Error fetching participants of chat group: ${error.message}`
    );
  }
};

module.exports = {
  createChatGroup,
  addMessageToChat,
  getChatById,
  setIoInstance,
  addUserToAllGroups,
  getParticipantsOfGroup,
};

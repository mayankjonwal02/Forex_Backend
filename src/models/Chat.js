// src/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  adminId: { type: String },
  groupName: { type: String, required: true },
  participants: [{ type: String }],
  messages: [{
    senderId: { type: String },
    message: String,
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);

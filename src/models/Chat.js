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

<<<<<<< HEAD
module.exports = mongoose.model("Chat", chatSchema);
=======
module.exports = mongoose.model('Chat', chatSchema);
>>>>>>> parent of 45bec8b (chat api done)

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderUsername: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });


const chatSchema = new mongoose.Schema({
  adminId: { type: String, required: true }, // Make sure this is required
  groupName: { type: String, required: true },
  participants: [{ type: String }],
  messages: [messageSchema], // Use the new messageSchema
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Convert to lowercase to avoid case sensitivity issues
  },
  traderId: {
    type: String,
    required: true,
    unique: true, // Ensure trader ID is unique
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; // Export the Admin model

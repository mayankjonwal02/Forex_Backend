// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  traderId: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  otp: { type: String }, // Temporary field for OTP
  otpExpires: { type: Date } // Expiry time for the OTP
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
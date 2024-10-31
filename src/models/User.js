const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  traderId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },  // New password field
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  otp: { type: String }  // Store OTP temporarily
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

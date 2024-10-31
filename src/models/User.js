const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  traderId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },  // New password field
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
<<<<<<< HEAD
  otp: { type: String }, // Temporary field for OTP
  otpExpires: { type: Date } // Expiry time for the OTP
=======
  otp: { type: String }  // Store OTP temporarily
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
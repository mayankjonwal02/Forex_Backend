// src/services/authService.js
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Function to generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.` // Corrected this line
  };

  await transporter.sendMail(mailOptions);
};

const registerUser = async (userData) => {
  const otp = generateOTP();
  const user = new User({ ...userData, otp });
  
  // Save user with OTP
  await user.save();

  // Send OTP to the user’s email
  await sendOtpEmail(userData.email, otp);
  return user;
};

const loginUser = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { registerUser, loginUser, getUserById };

// src/services/authService.js
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const loginUser = async (email, traderId, otp) => {
  return await User.findOne({ email, traderId, otp });
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { registerUser, loginUser, getUserById };

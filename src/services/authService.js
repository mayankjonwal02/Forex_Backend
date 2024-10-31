const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

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
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

const registerUser = async (userData) => {
  const otp = generateOTP();
  const hashedPassword = await bcrypt.hash(userData.password, 10);  // Hash the password
  const user = new User({ ...userData, password: hashedPassword, otp });
  
  await user.save();
  await sendOtpEmail(userData.email, otp);
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;  
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = { registerUser, loginUser, getUserById };

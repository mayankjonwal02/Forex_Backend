<<<<<<< HEAD
const nodemailer = require('nodemailer');
=======
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

<<<<<<< HEAD
// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use Gmail or another service
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password' // Your email password or app password
  }
});

// Register a new user and send OTP
const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  await sendOtp(user._id); // Send OTP after user registration
  return user;
};

// Generate random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Login user with OTP
const loginUser = async (otp) => {
  return await User.findOne({ otp });
=======
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
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
};

// Send OTP via email
const sendOtp = async (userId) => {
  const otp = generateOtp();
  const user = await User.findById(userId);
  
  user.otp = otp; // Store the OTP temporarily in the user's document
  await user.save();

  // Send OTP via email
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
  });

  return otp;
};

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Get all usernames for the participants list
const getAllParticipants = async () => {
  const users = await User.find({}, 'username'); // Retrieve only the username field
  return users.map(user => user.username); // Return an array of usernames
};

module.exports = { registerUser, loginUser, sendOtp, getUserById, getAllParticipants };

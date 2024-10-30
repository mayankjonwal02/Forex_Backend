// src/services/adminService.js
const Admin = require('../models/Admin');
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
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

const registerAdmin = async (adminData) => {
  const otp = generateOTP();
  const admin = new Admin({ ...adminData, otp });

  // Save admin with OTP
  await admin.save();

  // Send OTP to the admin’s email
  await sendOtpEmail(adminData.email, otp);
  return admin;
};

const loginAdmin = async (email, otp) => {
  const admin = await Admin.findOne({ email });
  if (!admin || admin.otp !== otp) {
    return null; // Return null if no admin found or OTP doesn't match
  }

  // Clear OTP after successful login
  admin.otp = undefined;
  await admin.save();

  return admin; // Return admin object if login is successful
};

module.exports = { registerAdmin, loginAdmin };

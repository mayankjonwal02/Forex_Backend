const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email
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

// Register Admin
const registerAdmin = async (adminData) => {
  const otp = generateOTP();
  const otpExpires = Date.now() + 10 * 60 * 1000; 
  const admin = new Admin({ ...adminData, otp, otpExpires });

  // Save admin with OTP
  await admin.save();

  // Send OTP to the admin’s email
  await sendOtpEmail(adminData.email, otp);
  return admin;
};

// Login Admin
const loginAdmin = async (email, otp) => {
  const admin = await Admin.findOne({ email });

  
  console.log("Admin found:", admin);
  console.log("Input OTP:", otp);
  console.log("Stored OTP:", admin ? admin.otp : null);
  console.log("OTP expiration:", admin ? admin.otpExpires : null);

  if (!admin || admin.otp !== otp || Date.now() > admin.otpExpires) {
    return null; 
  }

  
  admin.otp = undefined;
  admin.otpExpires = undefined;
  await admin.save();

  return admin;
};

module.exports = { registerAdmin, loginAdmin };

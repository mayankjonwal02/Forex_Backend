const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// Signup Admin with email and password
const signupAdmin = async (email, password) => {
  // Check if email already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new Error('Email already in use');
  }

  // Create a new admin
  const admin = new Admin({ email, password });
  await admin.save();

  return admin;
};

module.exports = { signupAdmin };

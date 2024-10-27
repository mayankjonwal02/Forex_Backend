// src/utils/validators.js

// Validate if required fields are present
const validateRequiredFields = (fields, data) => {
    const missingFields = fields.filter(field => !data[field]);
    return missingFields.length === 0 ? null : `Missing required fields: ${missingFields.join(', ')}`;
  };
  
  // Validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validate numeric input (e.g., for trade volume or prices)
  const isNumeric = (value) => {
    return !isNaN(value) && typeof value === 'number';
  };
  
  // Check if an input is a valid ObjectId (for MongoDB IDs)
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };
  
  module.exports = { validateRequiredFields, isValidEmail, isNumeric, isValidObjectId };
  
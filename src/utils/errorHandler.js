// src/utils/errorHandler.js

// Centralized error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
  
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  };
  
  // Custom Error class to handle specific error cases
  class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = { errorHandler, CustomError };
  
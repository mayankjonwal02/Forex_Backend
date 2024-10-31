// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { CustomError } = require("../utils/errorHandler");

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new CustomError("No token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Authorization middleware
const authorize =
  (roles = []) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError("Access denied: insufficient permissions", 403)
      );
    }
    next();
  };

module.exports = { authenticate, authorize };

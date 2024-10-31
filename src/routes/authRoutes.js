const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const chatService = require("../services/chatService");
const { authenticate } = require("../middlewares/authMiddleware"); // Import the authenticate middleware

// Signup route (no authentication needed)
router.post("/signup", async (req, res) => {
  try {
    const { email, traderId, username, password } = req.body; // Require password in signup
    const user = await authService.registerUser({
      email,
      traderId,
      username,
      password,
    });
    res
      .status(201)
      .json({ message: "OTP sent to your email", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route (no authentication needed)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Require password in login
    const user = await authService.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP route (authentication needed)
router.post("/verify-otp", authenticate, async (req, res) => {
  // Apply middleware here
  try {
    const { userId, otp } = req.body;
    const user = await authService.getUserById(userId);

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.otp = undefined; // Clear OTP after verification
    await user.save();

    await chatService.addUserToAllGroups(user.username);

    res.json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

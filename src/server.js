// src/server.js
require("./config/dotenv");
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const { setSocketIo } = require("./app");
const User = require("./models/User");
const chatService = require("./services/chatService");

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Create a new Socket.IO server instance
const io = new Server(server);

// Set the io instance in your controller
setSocketIo(io);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World from Mayank");
});

// Listen for connection events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages being sent
  socket.on("sendMessage", async ({ groupId, senderId, message }) => {
    try {
      // Find the user by senderId to check their role
      const user = await User.findById(senderId);
      if (!user) {
        socket.emit("error", { message: "User not found" });
        return;
      }

      // Check if the user is an admin
      if (user.role !== "admin") {
        socket.emit("error", { message: "Only admins can send messages" });
        return;
      }

      // If the user is an admin, add the message to the chat
      const chat = await chatService.addMessageToChat(
        groupId,
        senderId,
        message
      );
      io.to(groupId).emit("messageReceived", chat); // Notify others in the group
    } catch (error) {
      socket.emit("error", { message: error.message });
    }
  });

  // Optionally listen for other events
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

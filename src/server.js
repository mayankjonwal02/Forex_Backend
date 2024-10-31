// src/server.js
<<<<<<< HEAD
require("./config/dotenv");
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const { setSocketIo } = require("./app");
const User = require("./models/User");
const chatService = require("./services/chatService");
=======
require('./config/dotenv'); 
const app = require('./app'); 
const http = require('http'); 
const { Server } = require('socket.io'); 
const { setSocketIo } = require('./app'); 
const User = require('./models/User'); 
const chatService = require('./services/chatService'); 
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f

const PORT = process.env.PORT || 5001;

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
<<<<<<< HEAD
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages being sent
  socket.on("sendMessage", async ({ groupId, senderId, message }) => {
=======
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages being sent
  socket.on('sendMessage', async ({ groupId, senderId, message }) => {
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
    try {
      // Find the user by senderId to check their role
      const user = await User.findById(senderId);
      if (!user) {
<<<<<<< HEAD
        socket.emit("error", { message: "User not found" });
=======
        socket.emit('error', { message: 'User not found' });
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
        return;
      }

      // Check if the user is an admin
<<<<<<< HEAD
      if (user.role !== "admin") {
        socket.emit("error", { message: "Only admins can send messages" });
=======
      if (user.role !== 'admin') {
        socket.emit('error', { message: 'Only admins can send messages' });
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
        return;
      }

      // If the user is an admin, add the message to the chat
<<<<<<< HEAD
      const chat = await chatService.addMessageToChat(
        groupId,
        senderId,
        message
      );
      io.to(groupId).emit("messageReceived", chat); // Notify others in the group
    } catch (error) {
      socket.emit("error", { message: error.message });
=======
      const chat = await chatService.addMessageToChat(groupId, senderId, message);
      io.to(groupId).emit('messageReceived', chat); // Notify others in the group
    } catch (error) {
      socket.emit('error', { message: error.message });
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
    }
  });

  // Optionally listen for other events
<<<<<<< HEAD
  socket.on("disconnect", () => {
    console.log("User disconnected");
=======
  socket.on('disconnect', () => {
    console.log('User disconnected');
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

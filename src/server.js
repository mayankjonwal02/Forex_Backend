// src/server.js
require('./config/dotenv'); // Load environment variables
const app = require('./app'); // Import app as the default export
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import socket.io
const { setSocketIo } = require('./app'); // Import setSocketIo function from app

const PORT = process.env.PORT || 3001;

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
io.on('connection', (socket) => {
  console.log('A user connected');

  // Optionally listen for events emitted from the client
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
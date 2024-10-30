// src/app.js
const express = require('express');
const connectDB = require('./config/db');
require('./config/dotenv'); // Load environment variables
const router = require('./controllers/mycontroller'); // Import router as default export
const { setSocketIo } = require('./controllers/mycontroller'); // Import setSocketIo as named export

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use('/api', router); // Use router here

module.exports = app; // Default export for app
module.exports.setSocketIo = setSocketIo; // Named export for setSocketIo

// src/app.js
const express = require('express');
const connectDB = require('./config/db');
require('./config/dotenv');  // Load environment variables
const mycontroller = require('./controllers/mycontroller');
const app = express();



// Connect to MongoDB
connectDB();

app.use(express.json());

app.use('/api', mycontroller);
module.exports = app;

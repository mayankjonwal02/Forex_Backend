// src/app.js
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
require('./config/dotenv'); 
const router = require('./controllers/mycontroller'); 
const { setSocketIo } = require('./controllers/mycontroller'); 

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

app.use('/api', router); 

module.exports = app; 
module.exports.setSocketIo = setSocketIo; 

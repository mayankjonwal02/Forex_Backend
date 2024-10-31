// src/app.js
<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("./config/dotenv");
const router = require("./controllers/mycontroller");
const { setSocketIo } = require("./controllers/mycontroller");
=======
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
require('./config/dotenv'); 
const router = require('./controllers/mycontroller'); 
const { setSocketIo } = require('./controllers/mycontroller'); 
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f

const app = express();

// Connect to MongoDB
connectDB();

<<<<<<< HEAD
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api", router);

module.exports = app;
module.exports.setSocketIo = setSocketIo;
=======
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

app.use('/api', router); 

module.exports = app; 
module.exports.setSocketIo = setSocketIo; 
>>>>>>> 9e3e475cee249284fd00aba0bddd289e35ca241f

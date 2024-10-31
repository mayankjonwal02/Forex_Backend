// src/config/db.js
const mongoose = require('mongoose');
require("./dotenv");

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'forex-data',
     
    });
    console.log(`---------------------MongoDB Connected----------------------`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

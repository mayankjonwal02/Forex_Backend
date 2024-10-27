// src/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String },
  modules: [{ type: String }],
  instructorId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

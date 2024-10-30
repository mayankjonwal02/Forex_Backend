const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  numberOfLessons: { type: Number, required: true }, // New field for number of lessons
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

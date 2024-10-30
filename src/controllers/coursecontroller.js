// src/controllers/courseController.js
const Course = require('../models/Course');

// Add a new course
const addCourse = async (req, res) => {
  try {
    const { title, link, image } = req.body;

    if (!title || !link || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const course = new Course({ title, link, image });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addCourse };

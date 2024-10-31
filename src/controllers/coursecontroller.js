const Course = require("../models/Course");

// Add a new course
const addCourse = async (req, res) => {
  try {
    const { title, link, image, numberOfLessons } = req.body;

    // Check if all required fields are provided
    if (!title || !link || !image || numberOfLessons === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new course with the number of lessons
    const course = new Course({ title, link, image, numberOfLessons });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  try {
    const { title, link, image, numberOfLessons } = req.body;

    // Find the course by ID and update it
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, link, image, numberOfLessons },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};

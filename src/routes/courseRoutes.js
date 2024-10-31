const express = require("express");
const router = express.Router();
const {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursecontroller");

// Route to add a new course
router.post("/add", addCourse);

// Route to retrieve all courses
router.get("/", getAllCourses);

// Route to retrieve a course by ID
router.get("/:id", getCourseById);

// Route to update a course by ID
router.put("/:id", updateCourse);

// Route to delete a course by ID
router.delete("/:id", deleteCourse);

module.exports = router;

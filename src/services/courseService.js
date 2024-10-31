// src/services/courseService.js
const Course = require("../models/Course");

const createCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

const getCourseById = async (courseId) => {
  return await Course.findById(courseId).populate("instructorId");
};

const updateCourse = async (courseId, updatedFields) => {
  return await Course.findByIdAndUpdate(courseId, updatedFields, { new: true });
};

const deleteCourse = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};

module.exports = { createCourse, getCourseById, updateCourse, deleteCourse };

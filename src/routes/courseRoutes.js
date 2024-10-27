// src/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');

router.post('/create', async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:courseId', async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:courseId', async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.courseId, req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:courseId', async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.courseId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
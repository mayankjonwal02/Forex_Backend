const express = require('express');
const router = express.Router();
const { addCourse } = require('../controllers/coursecontroller');

router.post('/add', addCourse);

module.exports = router;

const express = require('express');
const router = express.Router();
const { addAnalysis } = require('../controllers/analysiscontroller');

// POST /api/analysis/add
router.post('/add', addAnalysis);

module.exports = router;

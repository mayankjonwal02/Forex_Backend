const express = require('express');
const router = express.Router();
const { 
  addAnalysis, 
  getAllAnalyses, 
  getAnalysisById, 
  updateAnalysis, 
  deleteAnalysis 
} = require('../controllers/analysiscontroller'); // Ensure the file name matches your controller

// POST /api/analysis/add - Add a new analysis
router.post('/add', addAnalysis);

// GET /api/analysis - Retrieve all analyses
router.get('/', getAllAnalyses);

// GET /api/analysis/:id - Retrieve a specific analysis by ID
router.get('/:id', getAnalysisById);

// PUT /api/analysis/:id - Update a specific analysis by ID
router.put('/:id', updateAnalysis);

// DELETE /api/analysis/:id - Delete a specific analysis by ID
router.delete('/:id', deleteAnalysis);

module.exports = router;

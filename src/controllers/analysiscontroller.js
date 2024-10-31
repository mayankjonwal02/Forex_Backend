const Analysis = require("../models/Analysis");

// Controller function to add a new analysis
const addAnalysis = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAnalysis = new Analysis({
      title,
      image,
      description,
    });

    await newAnalysis.save();
    res
      .status(201)
      .json({ message: "Analysis added successfully", analysis: newAnalysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller function to retrieve all analyses
const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find();
    res.status(200).json(analyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller function to retrieve a specific analysis by ID
const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found." });
    }

    res.status(200).json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller function to update an analysis by ID
const updateAnalysis = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const analysisId = req.params.id;

    const updatedAnalysis = await Analysis.findByIdAndUpdate(
      analysisId,
      { title, image, description },
      { new: true, runValidators: true }
    );

    if (!updatedAnalysis) {
      return res.status(404).json({ message: "Analysis not found." });
    }

    res.status(200).json({
      message: "Analysis updated successfully",
      analysis: updatedAnalysis,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller function to delete an analysis by ID
const deleteAnalysis = async (req, res) => {
  try {
    const analysisId = req.params.id;

    const deletedAnalysis = await Analysis.findByIdAndDelete(analysisId);

    if (!deletedAnalysis) {
      return res.status(404).json({ message: "Analysis not found." });
    }

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  addAnalysis,
  getAllAnalyses,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
};

const Analysis = require('../models/Analysis');

// Controller function to add a new analysis
const addAnalysis = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    // Validation
    if (!title || !image || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new analysis document
    const newAnalysis = new Analysis({
      title,
      image,
      description
    });

    // Save to database
    await newAnalysis.save();
    res.status(201).json({ message: 'Analysis added successfully', analysis: newAnalysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  addAnalysis
};

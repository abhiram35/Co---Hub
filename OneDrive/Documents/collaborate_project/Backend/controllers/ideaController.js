// Ideas Controller
const Idea = require('../models/Idea');
const User = require('../models/User');

// Create a new idea
exports.createIdea = async (req, res) => {
  try {
    const { title, description, domains, rolesNeeded } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate required fields
    if (!title || !description || !domains || domains.length === 0) {
      return res.status(400).json({ 
        error: 'Please provide title, description, and at least one domain' 
      });
    }

    // Create new idea
    const idea = new Idea({
      title,
      description,
      domains,
      rolesNeeded: rolesNeeded || [],
      createdBy: userId,
    });

    // Save idea to database
    await idea.save();

    // Populate creator details before returning
    await idea.populate('createdBy', 'name email domain');

    // Return success response
    res.status(201).json({
      message: 'Idea posted successfully',
      idea,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ideas
exports.getAllIdeas = async (req, res) => {
  try {
    // Find all ideas and populate creator details
    const ideas = await Idea.find()
      .populate('createdBy', 'name email domain')
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      message: 'Ideas fetched successfully',
      count: ideas.length,
      ideas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single idea by ID
exports.getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find idea by ID and populate creator details
    const idea = await Idea.findById(id).populate('createdBy', 'name email domain');

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.status(200).json({
      message: 'Idea fetched successfully',
      idea,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Idea Model
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  // Project idea title
  title: {
    type: String,
    required: [true, 'Please provide an idea title'],
    trim: true,
  },
  
  // Detailed description of the idea
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  
  // Array of domains needed for this idea
  domains: {
    type: [String],
    enum: ['Tech', 'Design', 'Content', 'Business'],
    required: [true, 'Please select at least one domain'],
  },
  
  // Array of roles needed (e.g., "Frontend Developer", "UI Designer", etc.)
  rolesNeeded: {
    type: [String],
    default: [],
  },
  
  // User ID of the person who created this idea
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator ID is required'],
  },
  
  // Timestamp - automatically created when idea is posted
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export Idea model
module.exports = mongoose.model('Idea', ideaSchema);

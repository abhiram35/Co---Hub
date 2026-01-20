// Project Model
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  // Reference to the Idea that this project is based on
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: [true, 'Idea ID is required'],
  },
  
  // Array of User IDs who are members of this project
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  
  // Current status of the project
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed'],
    default: 'Open',
  },
  
  // Timestamp - automatically created when project is created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export Project model
module.exports = mongoose.model('Project', projectSchema);

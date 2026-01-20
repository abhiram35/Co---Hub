// User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  
  // Email - must be unique for each user
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  
  // Password - will be hashed before saving
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false, // Don't return password by default in queries
  },
  
  // User's primary domain/expertise
  domain: {
    type: String,
    enum: ['Tech', 'Design', 'Content', 'Business'],
    required: [true, 'Please select a domain'],
  },
  
  // Array of project IDs that user has joined
  joinedProjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project',
    default: [],
  },
  
  // Array of project IDs that user has created
  createdProjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project',
    default: [],
  },
  
  // Timestamp - automatically created when user registers
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export User model
module.exports = mongoose.model('User', userSchema);

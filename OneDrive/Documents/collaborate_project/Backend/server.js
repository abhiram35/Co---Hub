// Import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import database connection
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const projectRoutes = require('./routes/projectRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware - CORS configuration to allow frontend requests
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Support both ports
  credentials: true
}));

// Middleware - Parse incoming JSON requests
app.use(express.json());

// Routes - API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/projects', projectRoutes);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API base URL: http://localhost:${PORT}/api`);
});

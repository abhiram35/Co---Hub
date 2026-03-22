// MongoDB Connection Configuration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB connected successfully');

    // Handle errors that occur AFTER initial connection
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB runtime error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.warn('⚠️  Server will run without database. Install MongoDB or configure MongoDB Atlas.');
    console.warn('📖 See DEBUGGING_LOGIN_ISSUES.md for setup instructions.');
    // Don't exit - let server continue running even without database
    // This allows testing the API without database
  }
};

module.exports = connectDB;

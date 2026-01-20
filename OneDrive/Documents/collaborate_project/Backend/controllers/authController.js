// Authentication Controller
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, domain } = req.body;

    // Validate required fields
    if (!name || !email || !password || !domain) {
      return res.status(400).json({ error: 'Please provide name, email, password, and domain' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      domain,
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        domain: user.domain,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user by email, and include password field (it's normally hidden)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with hashed password in database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        domain: user.domain,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Forgot Password - MVP version (just validates email exists)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required field
    if (!email) {
      return res.status(400).json({ error: 'Please provide an email address' });
    }

    // Check if user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists (security best practice)
      // But for MVP, we can be helpful
      return res.status(404).json({ error: 'Email not found in our system' });
    }

    // TODO (Future): Send password reset email
    // For now, we just acknowledge the request
    // In production, you would:
    // 1. Generate a reset token
    // 2. Save it in DB with expiration
    // 3. Send email with reset link
    // 4. User clicks link in email
    // 5. User resets password

    // MVP Response: Just confirm email was found
    res.status(200).json({
      message: 'If this email exists in our system, you will receive a password recovery email shortly.',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

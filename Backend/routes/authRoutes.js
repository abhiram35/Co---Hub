// Authentication Routes
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// POST /api/auth/forgot-password - Request password recovery
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;

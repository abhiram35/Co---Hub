// User Profile Routes (get/update profile + socials)
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users/me - get current user's profile (requires auth)
router.get('/me', authMiddleware, userController.getProfile);

// PUT /api/users/me - update profile (bio + socials)
router.put('/me', authMiddleware, userController.updateProfile);

// GET /api/users/:id - get any user's public profile
router.get('/:id', userController.getUserById);

module.exports = router;

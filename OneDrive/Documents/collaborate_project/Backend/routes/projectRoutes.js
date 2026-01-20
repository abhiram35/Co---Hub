// Projects Routes
const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/projects/join/:ideaId - Join a project (requires authentication)
router.post('/join/:ideaId', authMiddleware, projectController.joinProject);

// GET /api/projects/my-projects - Get user's projects (requires authentication)
router.get('/my-projects', authMiddleware, projectController.getMyProjects);

module.exports = router;

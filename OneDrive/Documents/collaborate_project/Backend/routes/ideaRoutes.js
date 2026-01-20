// Ideas Routes
const express = require('express');
const ideaController = require('../controllers/ideaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/ideas - Create new idea (requires authentication)
router.post('/', authMiddleware, ideaController.createIdea);

// GET /api/ideas - Get all ideas
router.get('/', ideaController.getAllIdeas);

// GET /api/ideas/:id - Get single idea by ID
router.get('/:id', ideaController.getIdeaById);

module.exports = router;

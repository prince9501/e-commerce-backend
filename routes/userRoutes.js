const express = require('express');
const router = express.Router();
const { signup, signin, logout, profile, checkAdmin } = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes (no authentication required)
router.post('/signup', signup); // User registration
router.post('/signin', signin); // User login

// Protected routes (require authentication)
router.post('/logout', authenticate, logout); // User logout
router.get('/profile', authenticate, profile); // Get user profile
router.get('/check-admin', authenticate, isAdmin, checkAdmin); // Check if user is admin

module.exports = router;
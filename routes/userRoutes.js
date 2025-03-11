const express = require('express');
const router = express.Router();
const { signup, signin, logout, profile, checkAdmin } = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');


router.post('/signup', signup);
router.post('/signin', signin);


router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, profile);
router.get('/check-admin', authenticate, isAdmin, checkAdmin);

module.exports = router;
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/auth"); // Import the authenticate middleware

// Protected routes (require authentication)
router.post("/add", authenticate, cartController.addToCart); // Add item to cart
router.post("/remove", authenticate, cartController.removeFromCart); // Remove item from cart
router.get("/", authenticate, cartController.getCart); // Get user's cart

module.exports = router;


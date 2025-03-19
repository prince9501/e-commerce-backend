const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middleware/auth");

// Add a review (authenticated users only)
router.post("/add", authenticate, reviewController.addReview);

// Get reviews for a product (public access)
router.get("/product/:productId", reviewController.getReviewsByProduct);

// Delete a review (authenticated users only)
router.delete("/delete/:reviewId", authenticate, reviewController.deleteReview);

module.exports = router;
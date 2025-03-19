const Review = require("../models/Review");
const { Types } = require("mongoose");

// Add a review
const addReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user._id; // Authenticated user's ID

  try {
    // Validate productId
    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    // Create a new review
    const review = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get reviews for a product
const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Validate productId
    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    // Fetch reviews for the product
    const reviews = await Review.find({ productId }).populate("userId", "name email");
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id; // Authenticated user's ID

  try {
    // Validate reviewId
    if (!Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid reviewId" });
    }

    // Find and delete the review
    const review = await Review.findOneAndDelete({ _id: reviewId, userId });
    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addReview,
  getReviewsByProduct,
  deleteReview,
};
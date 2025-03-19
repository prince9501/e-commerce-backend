const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); // Import review routes

// Load environment variables
dotenv.config();

// Debug: Log all environment variables
console.log("Environment Variables:", process.env);

// Debug: Log MongoDB URI
console.log("MongoDB URI:", process.env.MONGO_URI);

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", userRoutes); // Use userRoutes for authentication
app.use("/api/cart", cartRoutes); // Use cartRoutes for cart operations
app.use("/api/reviews", reviewRoutes); // Use reviewRoutes for review operations

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const User = require("../models/User");

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Assuming you have authentication middleware

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the cart
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity if product exists
      user.cart[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the item to remove
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get cart for a user
const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the functions correctly
module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
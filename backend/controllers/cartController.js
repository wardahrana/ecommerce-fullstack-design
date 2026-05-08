const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Return empty cart if doesn't exist
            return res.status(200).json({
                success: true,
                cart: { items: [], totalItems: 0, totalPrice: 0 }
            });
        }

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Create new cart if doesn't exist
            cart = new Cart({
                user: req.user.id,
                items: []
            });
        }

        // Check if product already in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if exists
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                productId: product._id,
                quantity,
                price: product.price,
                name: product.name,
                image: product.images?.[0] || ''
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                totalItems: cart.totalItems,
                totalPrice: cart.totalPrice
            }
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity === 0) {
            // Remove item if quantity is 0
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                totalItems: cart.totalItems,
                totalPrice: cart.totalPrice
            }
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            cart: {
                items: cart.items,
                totalItems: cart.totalItems,
                totalPrice: cart.totalPrice
            }
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
            cart: { items: [], totalItems: 0, totalPrice: 0 }
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
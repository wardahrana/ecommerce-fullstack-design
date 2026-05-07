// backend/routes/cartRoutes.js (SIMPLIFIED VERSION - No auth for now)
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// ✅ TEMPORARY - No auth middleware, use fixed user ID
const FIXED_USER_ID = 'guest_user_123';

// GET CART
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/cart called');
        let cart = await Cart.findOne({ user: FIXED_USER_ID });

        if (!cart) {
            console.log('No cart found, creating new one');
            cart = new Cart({
                user: FIXED_USER_ID,
                items: []
            });
            await cart.save();
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message
        });
    }
});

// ADD TO CART
router.post('/add', async (req, res) => {
    try {
        console.log('POST /api/cart/add called');
        const { productId, name, price, image, size, color, quantity = 1 } = req.body;

        if (!productId || !name || !price || !image) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: productId, name, price, image'
            });
        }

        let cart = await Cart.findOne({ user: FIXED_USER_ID });

        if (!cart) {
            cart = new Cart({
                user: FIXED_USER_ID,
                items: []
            });
        }

        // Check if item exists
        const existingItemIndex = cart.items.findIndex(
            item => item.productId === productId &&
                item.size === size &&
                item.color === color
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name,
                price,
                quantity,
                image,
                size,
                color
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            data: cart
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding item',
            error: error.message
        });
    }
});

// UPDATE QUANTITY
router.put('/update/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: FIXED_USER_ID });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item._id.toString() === itemId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Quantity updated',
            data: cart
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating quantity',
            error: error.message
        });
    }
});

// REMOVE ITEM
router.delete('/remove/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: FIXED_USER_ID });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item._id.toString() === itemId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item removed',
            data: cart
        });
    } catch (error) {
        console.error('Remove error:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing item',
            error: error.message
        });
    }
});

// CLEAR CART
router.delete('/clear', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: FIXED_USER_ID });

        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            data: cart || { user: FIXED_USER_ID, items: [] }
        });
    } catch (error) {
        console.error('Clear error:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing cart',
            error: error.message
        });
    }
});

module.exports = router;
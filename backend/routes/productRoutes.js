const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// All product routes require authentication
router.use(protect);

// Admin-only routes
router.get('/', getProducts);
router.post('/', adminOnly, createProduct);
router.delete('/:id', adminOnly, deleteProduct);

module.exports = router;
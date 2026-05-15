const express = require('express');
const router = express.Router();
// Controller functions ko import karein
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Routes ko controller functions se connect karein
router.get('/', getProducts);             // Saare products ya filtered products
router.get('/:id', getProductById);       // Single product
router.post('/', createProduct);          // Naya product add karna
router.put('/:id', updateProduct);        // Edit karna
router.delete('/:id', deleteProduct);     // Delete karna

module.exports = router;
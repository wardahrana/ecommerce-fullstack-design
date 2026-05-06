const express = require('express');
const router = express.Router();

// Temporary - dummy handlers if controllers don't exist yet
const getProducts = (req, res) => {
    res.json({ message: 'Products route working' });
};

const getProductById = (req, res) => {
    res.json({ message: `Get product ${req.params.id}` });
};

const createProduct = (req, res) => {
    res.json({ message: 'Create product' });
};

// Routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;
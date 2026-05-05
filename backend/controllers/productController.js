// Mock product management (protected, admin-only)
let products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 }
];

const getProducts = (req, res) => {
    res.json(products);
};

const createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ message: 'Product deleted' });
};

module.exports = { getProducts, createProduct, deleteProduct };
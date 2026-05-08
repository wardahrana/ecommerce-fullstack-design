import { useState, useEffect } from 'react';

// Default products (aapki existing products.js se match karna)
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        title: "Mens Long Sleeve T-shirt",
        price: 98.00,
        oldPrice: 149.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        stockStatus: "In stock",
        category: "clothings"
    },
    {
        id: 2,
        title: "Premium Wireless Headphones",
        price: 99.99,
        oldPrice: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        stockStatus: "In stock",
        category: "electronics"
    }
];

export const useProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('admin_products');
        if (stored) {
            setProducts(JSON.parse(stored));
        } else {
            setProducts(DEFAULT_PRODUCTS);
            localStorage.setItem('admin_products', JSON.stringify(DEFAULT_PRODUCTS));
        }
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem('admin_products', JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: Date.now() };
        setProducts(prev => [...prev, productWithId]);
    };

    const editProduct = (id, updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return { products, addProduct, editProduct, deleteProduct };
};
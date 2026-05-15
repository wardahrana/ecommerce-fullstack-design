// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi } from '../services/cartapi';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartOpen, setCartOpen] = useState(false); // ← controls CartPage visibility in AppHeader

    // ─── Helpers ──────────────────────────────────────────────
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // ─── READ: Fetch cart from backend ────────────────────────
    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return; // guest users — no fetch

        setLoading(true);
        try {
            const data = await cartApi.fetchCart();
            // Backend usually returns { cart: { items: [...] } } or { items: [...] }
            setItems(data?.cart?.items || data?.items || []);
        } catch (err) {
            console.error('fetchCart error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount (and whenever user logs in/out — see AppHeader logout)
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // ─── CREATE / ADD ──────────────────────────────────────────
    const addToCart = async (product) => {
        // Optimistic update: check if item already exists
        setItems(prev => {
            const exists = prev.find(i => (i._id || i.product) === product.productId);
            if (exists) {
                return prev.map(i =>
                    (i._id || i.product) === product.productId
                        ? { ...i, quantity: i.quantity + (product.quantity || 1) }
                        : i
                );
            }
            // Add new item with temp data so UI responds immediately
            return [...prev, {
                product: product.productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1,
            }];
        });

        try {
            await cartApi.addToCart(product);
            await fetchCart(); // sync with real backend response
        } catch (err) {
            console.error('addToCart error:', err);
            await fetchCart(); // rollback by re-fetching
        }
    };

    // ─── UPDATE: Change quantity ───────────────────────────────
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            // quantity 0 ya negative → remove item
            return removeFromCart(itemId);
        }

        // Optimistic update
        setItems(prev =>
            prev.map(i =>
                (i._id || i.product) === itemId ? { ...i, quantity } : i
            )
        );

        try {
            await cartApi.updateQuantity(itemId, quantity);
            await fetchCart();
        } catch (err) {
            console.error('updateQuantity error:', err);
            await fetchCart();
        }
    };

    // ─── DELETE: Remove single item ────────────────────────────
    const removeFromCart = async (itemId) => {
        // Optimistic update
        setItems(prev => prev.filter(i => (i._id || i.product) !== itemId));

        try {
            await cartApi.removeFromCart(itemId);
            await fetchCart();
        } catch (err) {
            console.error('removeFromCart error:', err);
            await fetchCart();
        }
    };

    // ─── DELETE: Clear entire cart ─────────────────────────────
    const clearCart = async () => {
        setItems([]); // optimistic

        try {
            await cartApi.clearCart();
        } catch (err) {
            console.error('clearCart error:', err);
            await fetchCart();
        }
    };

    // ─── Cart drawer/page toggle ───────────────────────────────
    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);
    const toggleCart = () => setCartOpen(v => !v);

    return (
        <CartContext.Provider value={{
            // State
            items,
            loading,
            cartOpen,
            totalItems,
            totalPrice,

            // CRUD
            fetchCart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,

            // UI controls
            openCart,
            closeCart,
            toggleCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook — easy import anywhere
export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
};
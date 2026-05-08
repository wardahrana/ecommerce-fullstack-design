// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../services/cartApi';
import { getCurrentUser } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const checkUser = () => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
        };
        checkUser();
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);
    
    const loadCart = async () => {
        if (!user) {
            setCartItems([]);
            setTotalItems(0);
            setTotalPrice(0);
            setLoading(false);
            return;
        }
        try {
            const data = await getCart();
            setCartItems(data.cart.items || []);
            setTotalItems(data.cart.totalItems || 0);
            setTotalPrice(data.cart.totalPrice || 0);
        } catch (error) {
            console.error('Load cart error:', error.message);
            setCartItems([]);
            setTotalItems(0);
            setTotalPrice(0);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadCart();
    }, [user]);
    
    const addToCart = async (product, quantity = 1) => {
        if (!user) {
            alert('Please login to add items to cart');
            return false;
        }
        try {
            const data = await apiAddToCart(product._id, quantity);
            setCartItems(data.cart.items);
            setTotalItems(data.cart.totalItems);
            setTotalPrice(data.cart.totalPrice);
            return true;
        } catch (error) {
            console.error('Add to cart error:', error);
            alert(error.message);
            return false;
        }
    };
    
    const updateQuantity = async (productId, quantity) => {
        try {
            const data = await apiUpdateCartItem(productId, quantity);
            setCartItems(data.cart.items);
            setTotalItems(data.cart.totalItems);
            setTotalPrice(data.cart.totalPrice);
        } catch (error) {
            console.error('Update quantity error:', error);
        }
    };
    
    const removeFromCart = async (productId) => {
        try {
            const data = await apiRemoveFromCart(productId);
            setCartItems(data.cart.items);
            setTotalItems(data.cart.totalItems);
            setTotalPrice(data.cart.totalPrice);
        } catch (error) {
            console.error('Remove from cart error:', error);
        }
    };
    
    const clearCart = async () => {
        try {
            const data = await apiClearCart();
            setCartItems([]);
            setTotalItems(0);
            setTotalPrice(0);
        } catch (error) {
            console.error('Clear cart error:', error);
        }
    };
    
    const syncCart = () => {
        loadCart();
    };
    
    return (
        <CartContext.Provider value={{
            cartItems,
            totalItems,
            totalPrice,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            syncCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
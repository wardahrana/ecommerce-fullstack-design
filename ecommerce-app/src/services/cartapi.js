// src/services/cartapi.js
const BASE_URL = import.meta.env.VITE_API_URL || 'https://ecommerce-fullstack-design-ruby.vercel.app';

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const cartApi = {
    fetchCart: async () => {
        const res = await fetch(`${BASE_URL}/api/cart`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },

    addToCart: async (product) => {
        const res = await fetch(`${BASE_URL}/api/cart/add`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(product)
        });
        return res.json();
    },

    updateQuantity: async (itemId, quantity) => {
        const res = await fetch(`${BASE_URL}/api/cart/update/${itemId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ quantity })
        });
        return res.json();
    },

    removeFromCart: async (itemId) => {
        const res = await fetch(`${BASE_URL}/api/cart/remove/${itemId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    },

    clearCart: async () => {
        const res = await fetch(`${BASE_URL}/api/cart/clear`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};
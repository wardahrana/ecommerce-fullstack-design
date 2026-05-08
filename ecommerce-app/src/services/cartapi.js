// src/services/cartApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/cart';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE
});

// Add auth token to every request
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Export cartApi object
export const cartApi = {
    fetchCart: async () => {
        const response = await axiosInstance.get('/');
        return response.data;
    },
    addToCart: async (product) => {
        const response = await axiosInstance.post('/add', product);
        return response.data;
    },
    updateQuantity: async (itemId, quantity) => {
        const response = await axiosInstance.put(`/update/${itemId}`, { quantity });
        return response.data;
    },
    removeFromCart: async (itemId) => {
        const response = await axiosInstance.delete(`/remove/${itemId}`);
        return response.data;
    },
    clearCart: async () => {
        const response = await axiosInstance.delete('/clear');
        return response.data;
    },
    getCartCount: async () => {
        const response = await axiosInstance.get('/count');
        return response.data;
    }
};
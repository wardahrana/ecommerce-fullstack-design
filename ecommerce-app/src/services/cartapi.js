// src/services/cartApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/cart';

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: API_BASE
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Named exports — CartContext ke saath match karte hain
export const getCart = async () => {
    const response = await axiosInstance.get('/');
    return response.data;
};

export const addToCart = async (productId, quantity) => {
    const response = await axiosInstance.post('/add', { productId, quantity });
    return response.data;
};

export const updateCartItem = async (productId, quantity) => {
    const response = await axiosInstance.put(`/update/${productId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await axiosInstance.delete(`/remove/${productId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await axiosInstance.delete('/clear');
    return response.data;
};

export const getCartCount = async () => {
    const response = await axiosInstance.get('/count');
    return response.data;
};
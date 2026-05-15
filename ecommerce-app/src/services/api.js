// src/services/api.js

// Base URL for your API
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'API request failed');
    }

    return data;
};

// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Save user session
export const saveUserSession = (userData) => {
    if (userData.token) {
        localStorage.setItem('authToken', userData.token);
    }
    if (userData.user) {
        localStorage.setItem('user', JSON.stringify(userData.user));
    }
};

// Get user session from localStorage
export const getUserSession = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
        try {
            return {
                token,
                user: JSON.parse(user)
            };
        } catch (error) {
            console.error('Error parsing user session:', error);
            return null;
        }
    }

    return null;
};

// Clear user session
export const clearUserSession = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};

// ✅ LOGOUT USER - Add this function
export const logoutUser = () => {
    clearUserSession();
    // You can also make an API call to your backend to invalidate the token if needed
    // For now, just clearing local storage is sufficient
    return Promise.resolve({ success: true, message: 'Logged out successfully' });
};

// Register new user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Get current user profile
export const getCurrentUser = async () => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get current user error:', error);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (userData) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};

// Get products
export const getProducts = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${API_BASE_URL}/products${queryParams ? `?${queryParams}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get products error:', error);
        throw error;
    }
};

// Get single product by ID
export const getProductById = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get product error:', error);
        throw error;
    }
};

// Get categories
export const getCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get categories error:', error);
        throw error;
    }
};

// Get featured products
export const getFeaturedProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/featured`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get featured products error:', error);
        throw error;
    }
};

// Get recommended items
export const getRecommendedItems = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/recommended`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get recommended items error:', error);
        throw error;
    }
};

// Add to cart
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Please login to add items to cart');
        }

        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Add to cart error:', error);
        throw error;
    }
};

// Get cart items
export const getCart = async () => {
    try {
        const token = getAuthToken();
        if (!token) {
            return { items: [] };
        }

        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Get cart error:', error);
        return { items: [] };
    }
};

// Remove from cart
export const removeFromCart = async (productId) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Please login to manage cart');
        }

        const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Remove from cart error:', error);
        throw error;
    }
};

// Update cart item quantity
export const updateCartQuantity = async (productId, quantity) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Please login to manage cart');
        }

        const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });

        const data = await handleResponse(response);
        return data;
    } catch (error) {
        console.error('Update cart error:', error);
        throw error;
    }
};
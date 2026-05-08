// src/services/productService.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";

// Get token from localStorage
const getToken = () => localStorage.getItem("authToken");

export const productService = {
  // Get all products
  getAll: async () => {
    try {
      const response = await axios.get(API_BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get single product by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Create product (admin only)
  create: async (productData) => {
    try {
      const response = await axios.post(API_BASE, productData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update product (admin only)
  update: async (id, productData) => {
    try {
      const response = await axios.put(`${API_BASE}/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete product (admin only)
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};
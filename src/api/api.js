// src/api/api.js
import axios from 'axios';

// Create an Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: 'https://platform.fatsecret.com/rest/server.api', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to fetch recipes based on a query
export const fetchRecipes = async (query) => {
  try {
    const response = await api.get(`/recipes/search`, {
      params: { q: query } // Use `params` to automatically handle query parameters
    });
    return response.data; // Assuming the API returns data directly
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    throw error; // Rethrow the error after logging it
  }
};

export default api;

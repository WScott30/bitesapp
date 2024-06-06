import axios from 'axios';
import qs from 'qs';

// Function to generate Edamam authentication parameters
const generateAuthParams = () => {
  return {
    app_id: process.env.EDAMAM_API_ID || 'ab7f013f',
    app_key: process.env.EDAMAM_API_KEY || '070d8a74d846cf379302b633132b126d',
  };
};

// Create an Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: 'https://api.edamam.com', // Base URL for Edamam API
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to fetch recipes based on a query
export const fetchRecipes = async (query) => {
  try {
    const endpoint = '/search';

    // Generate authentication parameters
    const authParams = generateAuthParams();

    // Combine all parameters including the query
    const requestParams = { ...authParams, q: query };

    // Make the request
    const response = await api.get(endpoint, {
      params: requestParams,
      paramsSerializer: params => qs.stringify(params)
    });

    return response.data; // Assuming the API returns data directly
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    throw error; // Rethrow the error after logging it
  }
};

export default api;

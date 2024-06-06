import axios from 'axios';

// Function to generate Edamam authentication parameters
const generateAuthParams = () => {
  return {
    app_id: process.env.EDAMAM_API_ID || 'ab7f013f',
    app_key: process.env.EDAMAM_API_KEY || '070d8a74d846cf379302b633132b126d	',
  };
};

// Function to perform API requests
const requestApi = async (endpoint, method = 'GET', data = {}) => {
  // Set the API endpoint base URL
  const baseUrl = 'https://api.edamam.com';
  const requestUrl = `${baseUrl}${endpoint}`;

  // Generate authentication parameters
  const authParams = generateAuthParams();

  // Combine all parameters
  const allParams = { ...authParams, ...data };

  // Prepare the request config for axios
  const axiosConfig = {
    method,
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (method.toUpperCase() === 'GET') {
    axiosConfig.params = allParams;
  } else {
    axiosConfig.data = allParams;
  }

  try {
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    console.error('API Request Failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default requestApi;

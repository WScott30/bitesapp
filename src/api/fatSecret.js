// src/api/fatSecret.js
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';  // Add this for proper query string handling

// Initialize the OAuth 1.0a Client
const oauth = new OAuth({
  consumer: {
    key: process.env.FATSECRET_API_KEY || 'f1fb26a0d06743d8bf2f1d257d607f72',  // Use environment variables
    secret: process.env.FATSECRET_API_SECRET || 'e678eab0d2ea49468137baf7bcb4a29a' // Use environment variables
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

// Token for accessing the API (empty in this OAuth 1.0a two-legged scenario)
const token = {
  key: '',
  secret: ''
};

// Function to perform API requests
const requestApi = async (method, url, data = {}) => {
  const requestData = {
    url,
    method,
    data
  };

  // Generate authorization header
  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));
  
  try {
    const response = await axios({
      method: requestData.method,
      url: requestData.url,
      headers: {
        ...authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)  // Use qs to encode data properly
    });
    return response.data;
  } catch (error) {
    console.error('API Request Failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default requestApi;

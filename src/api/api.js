import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';

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
  key: 'f1fb26a0d06743d8bf2f1d257d607f72',
  secret: 'e678eab0d2ea49468137baf7bcb4a29a'
};

// Function to generate OAuth parameters
const generateOAuthParams = () => {
  return {
    oauth_consumer_key: process.env.FATSECRET_API_KEY || 'f1fb26a0d06743d8bf2f1d257d607f72',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_version: '1.0',
  };
};

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
    const method = 'GET';
    const url = 'https://platform.fatsecret.com/rest/server.api';
    
    // Generate OAuth parameters
    const oauthParams = generateOAuthParams();
    
    // Combine all parameters including the query
    const allParams = { ...oauthParams, method, q: query, format: 'json' };
    
    // Create the Signature Base String
    const baseString = [
      method.toUpperCase(),
      encodeURIComponent(url),
      encodeURIComponent(qs.stringify(allParams, { encode: false }))
    ].join('&');
    
    // Create the Signing Key
    const signingKey = `${process.env.FATSECRET_API_SECRET || 'e678eab0d2ea49468137baf7bcb4a29a'}&`;
    
    // Calculate the OAuth signature
    const oauth_signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
    
    // Add the signature to the parameters
    const finalParams = { ...allParams, oauth_signature };
    
    // Make the request
    const response = await api.get(url, {
      params: finalParams,
      paramsSerializer: params => qs.stringify(params)
    });

    return response.data; // Assuming the API returns data directly
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    throw error; // Rethrow the error after logging it
  }
};

export default api;

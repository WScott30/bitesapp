import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';

// Initialize the OAuth 1.0a Client
 const  oauth = new OAuth({
  consumer: {
    key: process.env.FATSECRET_API_KEY || 'f1fb26a0d06743d8bf2f1d257d607f72',  // Use environment variables
    secret: process.env.FATSECRET_API_SECRET || 'e678eab0d2ea49468137baf7bcb4a29a' // Use environment variables
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

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

// Function to perform API requests
const requestApi = async (method, url, data = {}) => {
  // Set the API endpoint
  const requestUrl = 'https://platform.fatsecret.com/rest/server.api';

  // Generate OAuth parameters
  const oauthParams = generateOAuthParams();

  // Combine all parameters
  const allParams = { ...oauthParams, ...data };

  // Create the Signature Base String
  const baseString = [
    method.toUpperCase(),
    encodeURIComponent(requestUrl),
    encodeURIComponent(qs.stringify(allParams, { encode: false }))
  ].join('&');

  // Create the Signing Key
  const signingKey = `${process.env.FATSECRET_API_SECRET || 'e678eab0d2ea49468137baf7bcb4a29a'}&`;

  // Calculate the OAuth signature
  const oauth_signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  // Add the signature to the parameters
  const finalParams = { ...allParams, oauth_signature };

  // Prepare the request config for axios
  const axiosConfig = {
    method,
    url: requestUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };

  if (method.toUpperCase() === 'GET') {
    axiosConfig.params = finalParams;
    axiosConfig.paramsSerializer = params => qs.stringify(params);
  } else {
    axiosConfig.data = qs.stringify(finalParams);
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

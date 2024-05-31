// src/api/oauthUtility.js
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';

// Initialize OAuth 1.0a with your consumer key and secret
const oauth = OAuth({
  consumer: {
    key: process.env.REACT_APP_API_KEY, // API Key from the environment variable
    secret: process.env.REACT_APP_API_SECRET // API Secret from the environment variable
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.HmacSHA1(base_string, key).toString(crypto.enc.Base64);
  }
});

// Function to create the Authorization header
export const createAuthHeader = (url, method, data = {}) => {
  const requestData = {
    url,
    method,
    data: method === 'GET' ? undefined : data
  };

  const token = {
    key: 'f1fb26a0d06743d8bf2f1d257d607f72',  
    secret: 'f3658ae340324b7b8fdf634e725b4e62'
  };

  // OAuth authorizes the request data
  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));
  return authHeader;
};

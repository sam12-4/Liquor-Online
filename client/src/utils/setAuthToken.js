import axios from 'axios';

// Set or remove the auth token in axios headers
export const setAuthToken = token => {
  if (token) {
    // If token exists, set it as the default header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // If no token, remove the header
    delete axios.defaults.headers.common['x-auth-token'];
  }
}; 
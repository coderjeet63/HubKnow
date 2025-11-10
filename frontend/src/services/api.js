import axios from 'axios';

// Get the API URL from the .env.local file
const VITE_API_URL = import.meta.env.VITE_API_URL ;

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  This interceptor adds the auth token (from localStorage) 
  to every request header if it exists. This is how your
  backend 'protect' middleware will get the token.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
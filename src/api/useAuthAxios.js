// src/hooks/useAuthAxios.js - Fixed and enhanced version
import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// Create a base axios instance
const createBaseAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      // console.log(`API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('Response Error:', error.response?.status, error.response?.data);
      
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authData');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// Factory function to create an axios instance with token
const createAuthAxios = (token) => {
  const instance = createBaseAxios();
  
  if (token) {
    instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return instance;
};

// Custom hook to use axios with auth token
const useAuthAxios = () => {
  const { authData } = useContext(AuthContext);
  
  const authAxios = useMemo(() => {
    const token = authData?.token;
    return createAuthAxios(token);
  }, [authData?.token]);

  return authAxios;
};

export default useAuthAxios;
export { createAuthAxios, createBaseAxios };
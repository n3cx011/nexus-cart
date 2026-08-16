import axios from 'axios';

const API_KEY = 'NEXUS_SECURE_API_KEY_2026';

export const authApi 
= axios.create({ baseURL: 'http://localhost:8081',
  headers: { 'X-API-KEY': API_KEY } });

export const productApi 
= axios.create({ baseURL: 'http://localhost:8082',
  headers: { 'X-API-KEY': API_KEY } });

export const orderApi 
= axios.create({ baseURL: 'http://localhost:8083',
  headers: { 'X-API-KEY': API_KEY } });

export const paymentApi 
= axios.create({ baseURL: 'http://localhost:8084',
  headers: { 'X-API-KEY': API_KEY } });

// Automatically inject JWT token into headers if available
[authApi, productApi, orderApi].forEach(api => {
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
});
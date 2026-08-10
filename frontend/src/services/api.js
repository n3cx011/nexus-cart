import axios from 'axios';

export const authApi 
= axios.create({ baseURL: 'http://localhost:8081' });

export const productApi 
= axios.create({ baseURL: 'http://localhost:8082' });

export const orderApi 
= axios.create({ baseURL: 'http://localhost:8083' });

export const paymentApi 
= axios.create({ baseURL: 'http://localhost:8084' });

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
import axios from 'axios';

const API_KEY = 'NEXUS_SECURE_API_KEY_2026';
const GATEWAY_URL = 'http://localhost:8080';

// Helper function to create standard Gateway-bound Axios instances
const createGatewayClient = () => {
  const instance = axios.create({
    baseURL: GATEWAY_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });

  // Automatically inject JWT Bearer token into outgoing requests
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

// Export individual service clients targeted at the API Gateway
export const authApi = createGatewayClient();
export const productApi = createGatewayClient();
export const orderApi = createGatewayClient();
export const paymentApi = createGatewayClient();
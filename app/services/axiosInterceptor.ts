import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // console.log('[Request]', config);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error('[Response Error]', error);
    return Promise.reject(error);
  }
);

export default api;

// client — single axios instance for the Django REST API Gateway.
// Every api module imports this; nothing else should call axios directly.
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach the auth token to every request (once login is wired up).
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;

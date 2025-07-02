import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

// Her istekten önce login olmuş kullanıcının username bilgisini header'a ekle
api.interceptors.request.use(config => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    config.headers = config.headers || {};
    config.headers['x-username'] = user.username;
  }
  return config;
});

export default api;

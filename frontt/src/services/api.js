import axios from 'axios';

const api = axios.create({
baseURL: 'https://subscrivery-backend.onrender.com/api'
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://subscrivery-eq3-nsv4.vercel.app/api'
});

export default api;
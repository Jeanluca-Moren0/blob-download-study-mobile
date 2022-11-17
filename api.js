import axios from 'axios';

export const api = axios.create({ baseURL: 'https://blob-dowload-study-backend-production.up.railway.app' });
import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.REACT_APP_API_BASE_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export const getCategories = () => API.get('/categories');
export const addCategory = (data) => API.post('/categories', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getEntries = () => API.get('/entries');
export const createEntry = (data) => API.post('/entries', data);
export const updateEntry = (id, data) => API.put(`/entries/${id}`, data);
export const deleteEntry = (id) => API.delete(`/entries/${id}`);
export const fetchEntries = () => API.get('/entries');



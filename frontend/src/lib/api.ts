import axios from 'axios';

export const remote = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const credentialRemote = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

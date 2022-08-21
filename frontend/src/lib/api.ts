import axios from 'axios';

export const remote = axios.create({
  baseURL: 'http://localhost:4000',
});

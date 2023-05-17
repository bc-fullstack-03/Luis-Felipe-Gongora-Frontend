import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:8082/api/v1',
});

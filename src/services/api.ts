import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw new Error('Failed to fetch data from the API.');
};

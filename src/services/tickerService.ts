import { apiClient, handleApiError } from './api';

export const fetchCoinTickers = async (coin: string, market: string | { id: string, name: string }) => {
  try {
    const response = await apiClient.get(`/coins/${coin}/tickers`);

    // Ensure market is a string (either using 'name' or 'id' property if it's an object)
    const marketName = typeof market === 'string' ? market : market.name;

    // Now safely call .toLowerCase() on the market name
    const tickers = response.data.tickers.filter((ticker: any) => ticker.market.name.toLowerCase() === marketName.toLowerCase());

    return tickers;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchMarkets = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get('/exchanges');
    return response.data; 
  } catch (error) {
    handleApiError(error);
    return []; 
  }
};

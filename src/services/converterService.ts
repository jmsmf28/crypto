import { apiClient, handleApiError } from './api';

export const fetchSupportedCurrencies = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get('/simple/supported_vs_currencies');
    return response.data; // Returns an array of currency codes
  } catch (error) {
    handleApiError(error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchListCurrencies = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get('/coins/list');
    return response.data; // Returns an array of currency codes
  } catch (error) {
    handleApiError(error);
    return []; // Return an empty array in case of an error
  }
};

// Fetch conversion rate
export const fetchConversionRate = async (inputCurrency: string, targetCurrency: string): Promise<number> => {
  try {
    const response = await apiClient.get('/simple/price', {
      params: {
        ids: inputCurrency,
        vs_currencies: targetCurrency,
      },
    });
    return response.data[inputCurrency][targetCurrency]; // Extract conversion rate from response
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to fetch conversion rate.'); // Throw an error if the conversion fails
  }
};








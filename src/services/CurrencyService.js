import axios from 'axios'

const API_URL = 'https://status.neuralgeneration.com/api/currency';

export const getCurrencyRates = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200 && response.data) {
      return response.data; 
    } else {
      throw new Error('Ошибка при получении курсов валют');
    }
  } catch (error) {
    console.error('Ошибка в запросе к API:', error);
    return null; 
  }
};
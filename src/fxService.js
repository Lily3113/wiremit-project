const API_URL = 'https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS';

export const fetchFxRates = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch FX rates');
    }
    const data = await response.json();
    
    // The data is an array of objects, so we need to flatten it
    const rates = data.reduce((acc, obj) => ({ ...acc, ...obj }), {});
    
    return rates;
  } catch (error) {
    console.error('API call error:', error);
    return null;
  }
};
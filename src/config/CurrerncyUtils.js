import currencyData from './countries.json'; // Replace with the actual path to your JSON file

// Function to retrieve currency symbol based on country code

export const getCurrencySymbol = (countryCode) => {
  const countryData = currencyData.countries.country.find(
    (country) => country.countryName === countryCode
  );
  return countryData ? countryData.currencyCode : 'GBP'; // Default to 'GBP' if not found
}; 

// currencyUtils.js
export const fetchExchangeRates = async (baseCurrency, userCurrency, price) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/e286ca59c055230262d2aa60/pair/${baseCurrency}/${userCurrency}/${price}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      return data.conversion_results;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return 1; // Default to 1 if fetching fails (no conversion)
    }
  };
  
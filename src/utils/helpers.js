// src/utils/helpers.js

// Calculate profit or loss for a trade
const calculateProfitOrLoss = (buyPrice, sellPrice, volume) => {
    return (sellPrice - buyPrice) * volume;
  };
  
  // Format dates (e.g., for displaying trade timestamps)
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Convert user input strings to a consistent format (e.g., title case)
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };
  
module.exports = { calculateProfitOrLoss, formatDate, toTitleCase };
  
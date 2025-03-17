/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currencySymbol - The currency symbol to use
 * @returns {string} Formatted price with currency symbol
 */
export const formatPrice = (price, currencySymbol = '$') => {
  if (price === undefined || price === null) {
    return `${currencySymbol}0.00`;
  }
  return `${currencySymbol}${price.toFixed(2)}`;
};

/**
 * Format date to a readable string
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length of the text
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}; 
/**
 * Reusable Currency Formatter for Pakistani Rupees (PKR)
 * Ensures consistent display: Rs. 18,500
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return 'Rs. 0';
  }
  return `Rs. ${Math.round(price).toLocaleString('en-PK')}`;
};

export default formatPrice;

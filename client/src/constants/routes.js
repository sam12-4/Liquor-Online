/**
 * Application routes
 */
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: '/product/:productId',
  CATEGORY: '/product-category/:category',
  BRAND: '/brand/:brand',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  WISHLIST: '/wishlist',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_EDIT: '/admin/products/:productId',
  ADMIN_PRODUCT_NEW: '/admin/products/new',
  ADMIN_TAXONOMY: '/admin/taxonomy',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CUSTOMERS: '/admin/customers',
  
  // Order and payment routes
  ORDER_CONFIRMATION: '/order/confirmation/:orderId',
  ORDER_HISTORY: '/orders',
  
  // Legal and info pages
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-service',
  FAQ: '/faq',
};

export default ROUTES; 
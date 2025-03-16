/**
 * API endpoints
 */
export const ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  PRODUCTS_BY_BRAND: (brand) => `/products/brand/${brand}`,
  PRODUCTS_BY_TYPE: (type) => `/products/type/${type}`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  
  // Types
  TYPES: '/types',
  TYPE_BY_ID: (id) => `/types/${id}`,
  
  // Brands
  BRANDS: '/brands',
  BRAND_BY_ID: (id) => `/brands/${id}`,
  
  // Countries
  COUNTRIES: '/countries',
  COUNTRY_BY_ID: (id) => `/countries/${id}`,
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/me',
  
  // Cart
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  REMOVE_FROM_CART: (itemId) => `/cart/remove/${itemId}`,
  UPDATE_CART_ITEM: (itemId) => `/cart/update/${itemId}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  CREATE_ORDER: '/orders/create',
};

export default ENDPOINTS; 
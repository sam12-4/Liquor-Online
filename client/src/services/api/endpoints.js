/**
 * API endpoint definitions for the e-commerce platform.
 * Centralizes all backend routes for consistent access across services.
 */
export const ENDPOINTS = {
  // Product endpoints
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  PRODUCTS_BY_BRAND: (brand) => `/products/brand/${brand}`,
  PRODUCTS_BY_TYPE: (type) => `/products/type/${type}`,
  
  // Taxonomy endpoints
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  
  TYPES: '/types',
  TYPE_BY_ID: (id) => `/types/${id}`,
  
  BRANDS: '/brands',
  BRAND_BY_ID: (id) => `/brands/${id}`,
  
  COUNTRIES: '/countries',
  COUNTRY_BY_ID: (id) => `/countries/${id}`,
  
  // Authentication endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/me',
  
  // User management endpoints
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  
  // Upload endpoints
  UPLOAD_IMAGE: '/uploads/image',
  DELETE_IMAGE: '/uploads/image',
  
  // Shopping cart endpoints
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  REMOVE_FROM_CART: (itemId) => `/cart/remove/${itemId}`,
  UPDATE_CART_ITEM: (itemId) => `/cart/update/${itemId}`,
  
  // Order management endpoints
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  CREATE_ORDER: '/orders/create',
};

export default ENDPOINTS; 
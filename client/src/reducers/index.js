import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
// Import other reducers here when they're created
// import product from './productReducer';
// import taxonomy from './taxonomyReducer';
// import cart from './cartReducer';
// import order from './orderReducer';

export default combineReducers({
  auth,
  alert
  // Add other reducers here when they're created
  // product,
  // taxonomy,
  // cart,
  // order
}); 
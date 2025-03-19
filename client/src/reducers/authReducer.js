// Initial state with authentication removed
const initialState = {
  isAuthenticated: true, // Always true since we removed auth
  loading: false,
  user: {
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'admin',
    isAdmin: true
  }
};

/**
 * Auth reducer - simplified with authentication removed
 */
const authReducer = (state = initialState, action) => {
  // Always return the initial state since we removed authentication
  return state;
};

export default authReducer; 
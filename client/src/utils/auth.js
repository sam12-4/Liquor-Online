/**
 * Auth utility - simplified with authentication removed
 */

// No-op function for login
export const login = () => {
  console.log('Login functionality has been removed');
  return true;
};

// No-op function for logout
export const logout = () => {
  console.log('Logout functionality has been removed');
  return true;
};

// Always returns true since authentication is removed
export const isAuthenticated = () => true;

// Always returns true since authentication is removed
export const isUserLoggedIn = () => true;

// Always returns admin user
export const getUser = () => ({
  id: '1',
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'admin',
  isAdmin: true,
  phoneNumber: '+1234567890'
});

// Always returns true since we're using admin user
export const isAdmin = () => true;

// Simulated update function
export const updateUserContactMethods = async (userId, data) => {
  console.log('Update user contact methods:', { userId, data });
  return {
    success: true,
    message: 'Contact information updated successfully',
    user: {
      ...getUser(),
      ...data
    }
  };
}; 
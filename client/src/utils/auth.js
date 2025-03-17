/**
 * Authentication utilities for handling cookies and login state persistence
 */

import Cookies from 'js-cookie';

// Cookie names
const USER_TOKEN = 'user_token';
const ADMIN_TOKEN = 'admin_token';
const USER_DATA = 'user_data';
const ADMIN_DATA = 'admin_data';

// Cookie options
const getCookieOptions = (rememberMe = false) => {
  return {
    expires: rememberMe ? 30 : 1, // 30 days if remember me, 1 day if not
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax'
  };
};

// Sample user data (in a real app, these would come from a backend)
const SAMPLE_USERS = [
  {
    id: 1,
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123', // In a real app, this would be hashed
    role: 'user',
    phoneNumber: '+923278443240',
    wishlist: [],
    orders: []
  }
];

const SAMPLE_ADMINS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin',
    phoneNumber: '+923278443240',
    contactEmail: 'sameerh64h@gmail.com',  // Admin contact email for password resets
    contactPhone: '+923278443240'  // Admin contact phone for password resets
  }
];

// User authentication
export const userLogin = async (credentials, rememberMe = false) => {
  const { email, password } = credentials;
  
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = SAMPLE_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (user) {
        // Remove sensitive data before storing
        const { password, ...userWithoutPassword } = user;
        
        // Store auth data
        Cookies.set(USER_TOKEN, `user-token-${user.id}`, getCookieOptions(rememberMe));
        Cookies.set(USER_DATA, JSON.stringify(userWithoutPassword), getCookieOptions(rememberMe));
        
        resolve({ success: true, user: userWithoutPassword });
      } else {
        resolve({ success: false, error: 'Invalid email or password' });
      }
    }, 800); // Simulate network delay
  });
};

export const userLogout = () => {
  Cookies.remove(USER_TOKEN);
  Cookies.remove(USER_DATA);
  
  // For backward compatibility with localStorage approach
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  
  return { success: true };
};

export const isUserLoggedIn = () => {
  return !!Cookies.get(USER_TOKEN);
};

export const getUser = () => {
  const userData = Cookies.get(USER_DATA);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const requestUserPasswordReset = async (email) => {
  // In a real app, this would send an API request to trigger a password reset email
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = SAMPLE_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (user) {
        console.log(`Password reset email would be sent to ${email}`);
        resolve({ 
          success: true, 
          message: `Password reset link sent to ${email}. In a real app, this would send an email to the user.` 
        });
      } else {
        resolve({ success: false, error: 'No account found with that email address' });
      }
    }, 800); // Simulate network delay
  });
};

export const confirmUserPasswordReset = async (token, newPassword) => {
  // In a real app, this would verify the token and update the password in the database
  return new Promise((resolve) => {
    setTimeout(() => {
      if (token && newPassword) {
        resolve({ success: true, message: 'Password has been reset successfully' });
      } else {
        resolve({ success: false, error: 'Invalid token or password' });
      }
    }, 800); // Simulate network delay
  });
};

// Admin authentication
export const adminLogin = async (credentials, rememberMe = false) => {
  const { email, password } = credentials;
  
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const admin = SAMPLE_ADMINS.find(
        (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
      );
      
      if (admin) {
        // Remove sensitive data before storing
        const { password, ...adminWithoutPassword } = admin;
        
        // Store auth data
        Cookies.set(ADMIN_TOKEN, `admin-token-${admin.id}`, getCookieOptions(rememberMe));
        Cookies.set(ADMIN_DATA, JSON.stringify(adminWithoutPassword), getCookieOptions(rememberMe));
        
        // For backward compatibility
        localStorage.setItem('adminLoggedIn', 'true');
        
        resolve({ success: true, admin: adminWithoutPassword });
      } else {
        resolve({ success: false, error: 'Invalid email or password' });
      }
    }, 800); // Simulate network delay
  });
};

export const adminLogout = () => {
  Cookies.remove(ADMIN_TOKEN);
  Cookies.remove(ADMIN_DATA);
  
  // For backward compatibility
  localStorage.removeItem('adminLoggedIn');
  
  return { success: true };
};

export const isAdminLoggedIn = () => {
  return !!Cookies.get(ADMIN_TOKEN) || localStorage.getItem('adminLoggedIn') === 'true';
};

export const getAdminUser = () => {
  const adminData = Cookies.get(ADMIN_DATA);
  if (adminData) {
    try {
      return JSON.parse(adminData);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const requestAdminPasswordReset = async (email) => {
  // In a real app, this would send an API request to trigger a password reset email
  return new Promise((resolve) => {
    setTimeout(() => {
      const admin = SAMPLE_ADMINS.find(
        (a) => a.email.toLowerCase() === email.toLowerCase()
      );
      
      if (admin) {
        // Use the admin's designated contact information for password resets
        const contactEmail = admin.contactEmail || admin.email;
        const contactPhone = admin.contactPhone || admin.phoneNumber;
        
        console.log(`Admin password reset email would be sent to ${contactEmail}`);
        console.log(`Admin password reset SMS would be sent to ${contactPhone}`);
        
        resolve({ 
          success: true, 
          message: `Password reset link sent to ${contactEmail} and SMS to ${contactPhone}. In a real app, this would send an email and SMS to the admin.` 
        });
      } else {
        resolve({ success: false, error: 'No admin account found with that email address' });
      }
    }, 800); // Simulate network delay
  });
};

export const confirmAdminPasswordReset = async (token, newPassword) => {
  // In a real app, this would verify the token and update the password in the database
  return new Promise((resolve) => {
    setTimeout(() => {
      if (token && newPassword) {
        resolve({ success: true, message: 'Admin password has been reset successfully' });
      } else {
        resolve({ success: false, error: 'Invalid token or password' });
      }
    }, 800); // Simulate network delay
  });
};

// Contact methods management
export const updateUserContactMethods = async (userId, updates) => {
  // In a real app, this would update the user's contact methods in the database
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getUser();
      
      if (user && user.id === userId) {
        const updatedUser = { ...user, ...updates };
        Cookies.set(USER_DATA, JSON.stringify(updatedUser), getCookieOptions(true));
        
        resolve({ 
          success: true, 
          message: 'Contact methods updated successfully',
          user: updatedUser
        });
      } else {
        resolve({ success: false, error: 'User not found or unauthorized' });
      }
    }, 800); // Simulate network delay
  });
}; 
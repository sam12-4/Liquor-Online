const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const Admin = require('../models/admin');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  // Get token from headers or cookies
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Get token from cookie
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return next(new ErrorHandler('Login required to access this resource', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token is for admin
    if (decoded.isAdmin) {
      // Get admin from database
      req.user = await Admin.findById(decoded.id);
      req.isAdmin = true;
    } else {
      // Get user from database
      req.user = await User.findById(decoded.id);
      req.isAdmin = false;
    }
    
    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }
    
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (!req.isAdmin) {
    return next(new ErrorHandler('Access denied. Admin only.', 403));
  }
  next();
};

// Check if admin has specific permissions
const hasPermissions = (...permissions) => {
  return (req, res, next) => {
    // Check if user is admin
    if (!req.isAdmin) {
      return next(new ErrorHandler('Access denied. Admin only.', 403));
    }
    
    // Check if admin has required permissions
    for (const permission of permissions) {
      if (!req.user.permissions || !req.user.permissions[permission]) {
        return next(
          new ErrorHandler(
            `Access denied. Required permission: ${permission}`,
            403
          )
        );
      }
    }
    
    next();
  };
};

// Authorize roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { protect, admin, hasPermissions, authorizeRoles }; 
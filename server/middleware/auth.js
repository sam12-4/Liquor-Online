const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const Admin = require('../models/admin');

/**
 * Check if user is authenticated
 */
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
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

/**
 * Restrict access to admin only
 */
exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.isAdmin) {
    return next(new ErrorHandler('Access denied. Admin only.', 403));
  }
  
  next();
});

/**
 * Check if admin has specific permissions
 * @param  {...String} permissions - Required permissions
 */
exports.hasPermissions = (...permissions) => {
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

/**
 * Authorize roles
 * @param  {...String} roles - Roles to authorize
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return next(new ErrorHandler('Login required to access this resource', 401));
    }
    
    // For admin role, check if req.isAdmin is true
    if (roles.includes('admin') && req.isAdmin === true) {
      return next();
    }
    
    // For regular users with specific roles (if implemented in the future)
    if (req.user.role && roles.includes(req.user.role)) {
      return next();
    }
    
    return next(
      new ErrorHandler(
        `You do not have permission to access this resource`,
        403
      )
    );
  };
}; 
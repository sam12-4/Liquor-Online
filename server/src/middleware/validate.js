const { validationResult } = require('express-validator');

// Middleware to check for validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Common validation rules
exports.rules = {
  id: {
    in: ['params', 'body'],
    isMongoId: {
      errorMessage: 'Invalid ID format'
    }
  },
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Please enter a valid email'
    },
    normalizeEmail: true
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password must be at least 8 characters long'
    }
  },
  name: {
    in: ['body'],
    isLength: {
      options: { min: 2 },
      errorMessage: 'Name must be at least 2 characters long'
    },
    trim: true
  },
  price: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Price must be a positive number'
    }
  },
  stock: {
    in: ['body'],
    isInt: {
      options: { min: 0 },
      errorMessage: 'Stock must be a positive integer'
    }
  },
  isActive: {
    in: ['body'],
    isBoolean: {
      errorMessage: 'isActive must be a boolean'
    },
    optional: true
  }
}; 
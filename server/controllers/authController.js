const User = require('../models/user');
const Admin = require('../models/admin');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const asyncHandler = require('express-async-handler');

/**
 * Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(new ErrorHandler('Please provide name, email and password', 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('User already exists with this email', 400));
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/default',
      url: 'https://res.cloudinary.com/dc3hqcovg/image/upload/v1631234567/liquor-online/avatars/default.png'
    }
  });

  sendToken(user, 201, res, false);
});

/**
 * User login
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password', 400));
  }

  // Find user in database
  const user = await User.findOne({ email }).select('+password');

  // Check if user exists
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Check if user is using Google authentication
  if (user.isGoogleAccount) {
    return next(new ErrorHandler('This account uses Google authentication. Please sign in with Google.', 400));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(user, 200, res, false);
});

/**
 * Admin login
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
exports.loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password', 400));
  }

  // Find admin in database
  const admin = await Admin.findOne({ email }).select('+password');

  // Check if admin exists
  if (!admin) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Check if password is correct
  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(admin, 200, res, true);
});

/**
 * Google OAuth login/register
 * @route   POST /api/auth/google
 * @access  Public
 */
exports.googleAuth = asyncHandler(async (req, res, next) => {
  const { googleId, name, email, avatar } = req.body;

  // Validate required fields
  if (!googleId || !name || !email) {
    return next(new ErrorHandler('Missing required Google account information', 400));
  }

  // Find user with Google ID or email
  let user = await User.findOne({ 
    $or: [{ googleId }, { email }]
  });

  if (user) {
    // Update user's Google ID if not present (user previously registered with email)
    if (!user.googleId) {
      user.googleId = googleId;
      user.isGoogleAccount = true;
      await user.save();
    }
  } else {
    // Create new user with Google account
    user = await User.create({
      name,
      email,
      googleId,
      isGoogleAccount: true,
      avatar: {
        public_id: 'avatars/google',
        url: avatar || 'https://res.cloudinary.com/dc3hqcovg/image/upload/v1631234567/liquor-online/avatars/default.png'
      }
    });
  }

  sendToken(user, 200, res, false);
});

/**
 * Logout user/admin
 * @route   GET /api/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

/**
 * Get currently logged in admin profile
 * @route   GET /api/auth/admin/me
 * @access  Private/Admin
 */
exports.getAdminProfile = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.user.id);

  res.status(200).json({
    success: true,
    admin
  });
});

/**
 * Update user password
 * @route   PUT /api/auth/password/update
 * @access  Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check if user is using Google authentication
  if (user.isGoogleAccount) {
    return next(new ErrorHandler('Password cannot be updated for Google accounts', 400));
  }

  // Check current password
  const isMatched = await user.comparePassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Current password is incorrect', 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res, false);
});

/**
 * Update admin password
 * @route   PUT /api/auth/admin/password/update
 * @access  Private/Admin
 */
exports.updateAdminPassword = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.user.id).select('+password');

  // Check current password
  const isMatched = await admin.comparePassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Current password is incorrect', 400));
  }

  admin.password = req.body.newPassword;
  await admin.save();

  sendToken(admin, 200, res, true);
});

/**
 * Update user profile
 * @route   PUT /api/auth/me/update
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  // Update avatar: TODO - implement with Cloudinary

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    user
  });
});

/**
 * Update admin profile
 * @route   PUT /api/auth/admin/me/update
 * @access  Private/Admin
 */
exports.updateAdminProfile = asyncHandler(async (req, res, next) => {
  const newAdminData = {
    name: req.body.name
  };

  // Don't allow email updates for admin accounts for security
  // Update avatar: TODO - implement with Cloudinary

  const admin = await Admin.findByIdAndUpdate(req.user.id, newAdminData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    admin
  });
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {  // Problem is here
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
/**
 * Create and send JWT token with response
 * @param {Object} user - User or Admin object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 * @param {Boolean} isAdmin - Flag indicating if this is an admin token
 */
const sendToken = (user, statusCode, res, isAdmin) => {
  // Create JWT token
  const token = user.getJwtToken();
  
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };
  
  // User data to return in response
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email
  };
  
  // Add isGoogleAccount for regular users
  if (!isAdmin && user.isGoogleAccount !== undefined) {
    userData.isGoogleAccount = user.isGoogleAccount;
  }
  
  // Add permissions for admin
  if (isAdmin && user.permissions) {
    userData.permissions = user.permissions;
  }
  
  // Send response with token
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: userData,
    isAdmin
  });
};

module.exports = sendToken; 
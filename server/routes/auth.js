const express = require('express');
const router = express.Router();
const passport = require('passport');
const sendToken = require('../utils/jwtToken');
const { 
  registerUser, 
  loginUser,
  loginAdmin,
  googleAuth, 
  logout, 
  getUserProfile,
  getAdminProfile,
  updateProfile,
  updateAdminProfile,
  updatePassword,
  updateAdminPassword
} = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// User public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.get('/logout', logout);

// Google OAuth routes
router.get('/google/login', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Create token and send to client
    sendToken(req.user, 200, res, false);
  }
);

// User protected routes
router.get('/me', isAuthenticated, getUserProfile);
router.put('/me/update', isAuthenticated, updateProfile);
router.put('/password/update', isAuthenticated, updatePassword);

// Admin routes
router.post('/admin/login', loginAdmin);
router.get('/admin/me', isAuthenticated, isAdmin, getAdminProfile);
router.put('/admin/me/update', isAuthenticated, isAdmin, updateAdminProfile);
router.put('/admin/password/update', isAuthenticated, isAdmin, updateAdminPassword);

module.exports = router; 
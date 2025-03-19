const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Admin dashboard stats route
router.get('/dashboard', protect, admin, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin dashboard stats will be implemented here'
  });
});

module.exports = router; 
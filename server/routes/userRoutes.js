const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Placeholder for user routes - can be expanded later
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar
    }
  });
});

module.exports = router; 
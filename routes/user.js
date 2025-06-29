const express = require('express');
const { loginUser, signupUser } = require('../controllers/authUserController.js');
const requireAuth = require('../middleware/requireAuth.js')

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

// Protected route example
router.get('/profile', requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'You are authorized!',
    user: req.user,
  });
});

module.exports = router;

const express = require('express');
const router  = express.Router();

const {
  register, login, getMe, changePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  registerValidator, loginValidator, changePasswordValidator,
} = require('../validators/authValidators');

// Public
router.post('/register', registerValidator, register);
router.post('/login',    loginValidator,    login);

// Protected
router.get ('/me',              protect, getMe);
router.patch('/change-password', protect, changePasswordValidator, changePassword);

module.exports = router;

const express = require('express');
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getLoggedInUser);

module.exports = router;

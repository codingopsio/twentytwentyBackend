const express = require('express');
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require('../controllers/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;

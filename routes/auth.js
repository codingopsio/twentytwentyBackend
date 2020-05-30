const express = require('express');
const {
  registerUser,
  loginUser,
  getLoggedInUser,
  updateDetails,
  updatePassword,
  emailVerification,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/verifyemail').post(emailVerification);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getLoggedInUser);
router.route('/updatedetails').put(protect, updateDetails);
router.route('/updatepassword').put(protect, updatePassword);

module.exports = router;

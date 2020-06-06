const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedInUser,
  updateDetails,
  updatePassword,
  emailVerification,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/accountverification/:id").get(emailVerification);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getLoggedInUser);
router.route("/updatedetails").put(protect, updateDetails);
router.route("/updatepassword").put(protect, updatePassword);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").post(resetPassword);

module.exports = router;

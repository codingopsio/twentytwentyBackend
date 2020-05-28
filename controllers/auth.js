const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc - Registering User
// @route - POST api/v1/ auth/register
// @access - Private
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Login User
// @route - POST api/v1/ auth/login
// @access - Private
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Error message if email and password are not present
    if (!email || !password) {
      return next(new ErrorResponse(`Please provide credentials`, 400));
    }

    // Check for the user
    const user = await User.findOne({ email: email }).select('+password');

    // Error message if user not present
    if (!user) {
      return next(new ErrorResponse(`No User found`, 401));
    }

    // Checking for password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Incorrect Password', 400));
    }

    // Generate Token now
    const token = user.generateToken();

    console.log(req);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Get current logged in user
// @route - GET api/v1/ auth/me
// @access - Private
exports.getLoggedInUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

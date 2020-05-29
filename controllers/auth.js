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

    // generating a cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res.status(200).cookie('token', token, options).json({
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

    // Generating a cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res.status(200).cookie('token', token, options).json({
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
    const user = await User.findOne({ email: req.user.email });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

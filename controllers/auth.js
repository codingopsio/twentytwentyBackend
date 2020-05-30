const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendemail');

// @desc - Registering User
// @route - POST api/v1/ auth/register
// @access - Private
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Creating a token
    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });

    // Sending an email to verify account
    try {
      const emailInfo = await sendEmail({
        email: email,
        subject:
          'Please copy the token below and paste it to confirm Email verification',
        html: `
		<h2>Please click on given link to activate your account</h2>
		<p>${req.protocol}://${req.get(
          'host'
        )}/api/v1/auth/accountverification/${token}</p>
		`,
      });
    } catch (err) {
      console.log(err);
      return next(new ErrorResponse(`Email could not be send`, 500));
    }

    res.status(200).json({
      success: true,
      data: 'Email sent',
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Email Verification
// @route - POST api/v1/ auth/verifyemail
// @access - Public
exports.emailVerification = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Creating user
        const user = await User.create({
          name: decoded.name,
          email: decoded.email,
          password: decoded.password,
        });

        res.status(200).json({
          success: true,
          msg: 'Email verification confirmed! Your account has been created.',
        });
      } catch (err) {
        return next(err);
      }
    } else {
      return next(
        new ErrorResponse('Something went wrong with account verification', 500)
      );
    }
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

// @desc - Updating User Details
// @route - PUT api/v1/ auth/updatedetails
// @access - Private
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name || req.user.name,
      email: req.body.email || req.user.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new ErrorResponse(`No user found`, 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Updating Password
// @route - PUT api/v1/ auth/updatepassword
// @access - Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (!(await user.comparePassword(currentPassword))) {
      return next(new ErrorResponse(`Incorrect password`, 400));
    }

    user.password = newPassword;
    await user.save();

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

// @desc - Forgot Password
// @route - POST api/v1/ auth/forgotpassword
// @access - Public

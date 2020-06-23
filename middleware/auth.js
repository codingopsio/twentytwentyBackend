const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// For authorization
exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    // If token not present
    if (!token) {
      return next(new ErrorResponse(`Not authorized to access`, 401));
    }

    // Decoding and verifying from jwt
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      req.user = await User.findById(decoded.id);

      next();
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    next(err);
  }
};

// Grant access for specific roles --> eg: Deleting a webinar is only for admins not users
exports.authorize = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      return next(
        new ErrorResponse(
          `User role - ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

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

      req.user = await User.findById(decoded.id);

      console.log(decoded);

      next();
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    next(err);
  }
};

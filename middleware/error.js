const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };


  error.message = err.message;
  console.log(err.message);

  let message;

  // Mongoose Validation error
  if (err.name === "ValidationError") {
    message = err.message;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate keys
  if (err.code === 11000) {
    message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose bad ObjectId error
  if (err.name === "CastError") {
    message = `Resource not found with id of id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;

const Webinar = require("../models/Webinar");
const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");

// @desc - Get reviews of a particular webinar
// @route - GET api/v1/webinars/:webinarId/reviews
// @access - Private

exports.getReviews = async (req, res, next) => {
  try {
    if (req.params.webinarId) {
      const reviews = await Review.find({
        webinar: req.params.webinarId,
      }).populate({
        path: "user",
        select: "name",
      });

      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc - Create review
// @route - POST api/v1/ webinars/:webinarId/reviews
// @access - Private
exports.createReview = async (req, res, next) => {
  try {
    const webinar = await Webinar.findById(req.params.webinarId);

    if (!webinar) {
      return next(new ErrorResponse("Sorry, no webinar found", 404));
    }

    req.body.webinar = req.params.webinarId;
    req.body.user = req.user.id;

    const obj = { ...req.body };

    const review = await Review.create(obj);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Delete review
// @route - DELETE api/v1/webinars/:webinarId/reviews/:reviewId
// @access - Private

exports.deleteReview = async (req, res, next) => {
  try {
    const webinar = await Webinar.findById(req.params.webinarId);

    if (!webinar) {
      return next(new ErrorResponse("Webinar doesnot exists", 404));
    }
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return next(new ErrorResponse("Review doesnot exists", 404));
    }

    console.log(review.user._id, req.user.id.toString());

    if (req.user.id !== review.user._id.toString()) {
      return next(
        new ErrorResponse("Not authorize to delete this review", 400)
      );
    }

    await Review.findByIdAndDelete(req.params.reviewId);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Update review
// @route - PUT api/v1/webinars/:webinarId/reviews/:reviewId
// @access - Private

exports.updateReview = async (req, res, next) => {
  try {
    const webinar = await Webinar.findById(req.params.webinarId);
    if (!webinar) {
      return next(new ErrorResponse("Webinar doesnot exists", 404));
    }
    let review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(new ErrorResponse("Review Doesnot exists", 404));
    }
    if (req.user.id !== review.user._id.toString()) {
      return next(
        new ErrorResponse("Not authorized to update this review", 400)
      );
    }
    review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: "true",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

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

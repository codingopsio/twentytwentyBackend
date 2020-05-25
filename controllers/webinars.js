const ErrorResponse = require('../utils/errorResponse');
const Webinar = require('../models/Webinar');

// @desc - Get all webinars
// @route - GET api/v1/ webinars
//  @access - Public
exports.getWebinars = async (req, res, next) => {
  try {
    let webinars = await Webinar.find();

    res.status(200).json({
      success: true,
      count: webinars.length,
      data: webinars,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Create a webinar
// @route - POST api/v1/ webinars
//  @access - Private
exports.createWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.create(req.body);

    res.status(200).json({ success: true, data: webinar });
  } catch (err) {
    next(err);
  }
};

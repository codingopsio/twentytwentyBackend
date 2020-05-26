const ErrorResponse = require('../utils/errorResponse');
const Webinar = require('../models/Webinar');

// @desc - Get all webinars
// @route - GET api/v1/ webinars
// @access - Public
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

// @desc - Get single webinar
// @route - GET api/v1/ webinars/:id
// @access - Public
exports.getWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return next(
        new ErrorResponse(`Sorry no webinar with this id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: webinar,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Create a webinar
// @route - POST api/v1/ webinars
// @access - Private
exports.createWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.create(req.body);

    res.status(200).json({ success: true, data: webinar });
  } catch (err) {
    next(err);
  }
};

// @desc - Update a webinar
// @route - PUT api/v1/ webinars/:id
// @access - Private
exports.updateWebinar = async (req, res, next) => {
  try {
    let webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return next(
        new ErrorResponse(`Sorry no webinar with this ${req.params.id}`, 404)
      );
    }

    webinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: webinar,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Delete a webinar
// @route - DELETE api/v1/ webinars/:id
// @access - Private
exports.deleteWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return next(
        new ErrorResponse(
          `Sorry nothing found with this id ${req.params.id}`,
          404
        )
      );
    }

    await Webinar.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

const ErrorResponse = require('../utils/errorResponse');
const Webinar = require('../models/Webinar');

// @desc - Get all webinars
// @route - GET api/v1/ webinars
// @access - Public
exports.getWebinars = async (req, res, next) => {
  try {
    console.log(req.query);

    // Advanced Filtering
    let queryString = { ...req.query };
    let fields;

    // For pagination, If **select** is present in the query, then deleting that
    if (req.query.select) {
      const selectFieldDelete = delete queryString.select;
      fields = req.query.select.split(',').join(' ');
    }

    // For pagination, If **page** is present in the query, then deleting that
    if (req.query.page) {
      const pageFieldDelete = delete queryString.page;
    }

    // For pagination, If **limit** is present in the query, then deleting that
    if (req.query.limit) {
      const limitFieldDelete = delete queryString.limit;
    }

    // Filtering for category - eg: Fullstack, Frontend, Nodejs
    let query = JSON.stringify(queryString);
    query = query.replace('in', '$in');

    //  Pagination Logic
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Webinar.countDocuments();

    // For Previous & Next Page
    let pagination = {
      currentPage: page,
    };

    if (endIndex < total) {
      pagination.nextPage = page + 1;
    }

    if (startIndex > page || startIndex === page) {
      pagination.prevPage = page - 1;
    }

    query = await Webinar.find(JSON.parse(query))
      .skip(startIndex)
      .limit(limit)
      .select(fields)
      .populate('questions');

    let webinars = await query;

    res.status(200).json({
      success: true,
      count: webinars.length,
      pagination,
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

    webinar.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Photo Upload for  webinar
// @route - POST api/v1/ webinars/:id/photo
// @access - Private
exports.uploadPhoto = async (req, res, next) => {
  try {
    let webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return next(
        new ErrorResponse(
          `Sorry, no webinar found with this id ${req.params.id}`,
          404
        )
      );
    }

    const file = req.files.file;

    if (!file.mimetype.startsWith('image')) {
      return next(
        new ErrorResponse(`Error in uploading file ${file.name}`, 400)
      );
    }

    if (file.size > process.env.MAX_PHOTO_SIZE) {
      return next(
        new ErrorResponse(`The image ${file.name} is too large to upload`, 400)
      );
    }

    file.mv(`${process.env.PHOTO_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        return next(new ErrorResponse(`Error in uploading`, 400));
      }
    });

    webinar = await Webinar.findByIdAndUpdate(
      req.params.id,
      {
        photo: file.name,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: webinar,
    });
  } catch (err) {
    next(err);
  }
};

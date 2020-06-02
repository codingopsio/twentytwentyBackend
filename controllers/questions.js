const Question = require('../models/Question');
const Webinar = require('../models/Webinar');
const ErrorResponse = require('../utils/errorResponse');

// @desc - Get all questions
// @route - GET api/v1/ questions
// @access - Private
exports.getQuestions = async (req, res, next) => {
  try {
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
    const total = await Question.countDocuments();

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

    query = await Question.find(JSON.parse(query))
      .skip(startIndex)
      .limit(limit)
      .select(fields);

    let questions = await query;

    res.status(200).json({
      success: true,
      count: questions.length,
      pagination,
      data: questions,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Get single question
// @route - GET api/v1/ questions/:questionId
// @access - Private
exports.getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId).populate({
      path: 'webinar',
      select: 'title description',
    });

    if (!question) {
      return next(new ErrorResponse('Sorry, no question found', 404));
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Create question
// @route - POST api/v1/ webinars/:webinarId/questions
// @access - Private
exports.createQuestion = async (req, res, next) => {
  try {
    req.body.webinar = req.params.webinarId;
    req.body.user = req.user.id;

    const webinar = await Webinar.findById(req.params.webinarId);

    if (!webinar) {
      return next(new ErrorResponse('Sorry, no webinar found', 404));
    }

    // Image upload
    const file = req.files.file;

    //   Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an Image file`, 400));
    }

    //   Check filesize
    if (file.size > process.env.MAX_PHOTO_SIZE) {
      return next(
        new ErrorResponse(`Please upload an Image, of size less than 4mb`, 400)
      );
    }

    file.mv(`${process.env.PHOTO_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        return next(new ErrorResponse(`Error in uploading`, 400));
      }
    });

    const obj = { ...req.body, photo: file.name };

    const question = await Question.create(obj);

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Update question
// @route - PUT api/v1/ questions/:questionId
// @access - Private
exports.updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.questionId);

    if (!question) {
      return next(new ErrorResponse('No question found with this ID', 404));
    }

    // Checking ownership of the review, i.e user can update his/her own review
    if (question.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to update this review', 400)
      );
    }

    // Photo uploading
    let file = new Object();

    if (!req.files) {
      file.name = question.photo;
    } else {
      file = req.files.file;
      //   Make sure the image is a photo
      if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an Image file`, 400));
      }

      //   Check filesize
      if (file.size > process.env.MAX_PHOTO_SIZE) {
        return next(
          new ErrorResponse(
            `Please upload an Image, of size less than 4mb`,
            400
          )
        );
      }

      file.mv(`${process.env.PHOTO_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
          return next(new ErrorResponse(`Error in uploading`, 400));
        }
      });
    }

    const obj = { ...req.body, photo: file.name };

    question = await Question.findByIdAndUpdate(req.params.questionId, obj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Delete question
// @route - DELETE api/v1/ questions/:questionId
// @access - Private
exports.deleteQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.questionId);

    if (!question) {
      return next(new ErrorResponse('No question found with this ID', 404));
    }

    // Checking ownership of the review, i.e user can update his/her own review
    if (question.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse('Not authorized to delete this review', 400)
      );
    }

    await question.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

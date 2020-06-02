const Question = require('../models/Question');
const Webinar = require('../models/Webinar');
const ErrorResponse = require('../utils/errorResponse');

// @desc - Get all questions
// @route - GET api/v1/ questions
// @access - Private
exports.getQuestions = async (req, res, next) => {
  try {
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

const express = require('express');
const {
  createQuestion,
  updateQuestion,
  getQuestions,
  getQuestion,
  deleteQuestion,
} = require('../controllers/questions');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, createQuestion).get(protect, getQuestions);
router
  .route('/:questionId')
  .put(protect, updateQuestion)
  .get(protect, getQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;

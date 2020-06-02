const express = require('express');
const { createQuestion, updateQuestion } = require('../controllers/questions');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, createQuestion);
router.route('/:questionId').put(protect, updateQuestion);

module.exports = router;

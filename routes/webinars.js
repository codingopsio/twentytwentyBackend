const express = require('express');
const {
  createWebinar,
  getWebinars,
  getWebinar,
  updateWebinar,
  deleteWebinar,
  uploadPhoto,
} = require('../controllers/webinars');

const router = express.Router();

// Include other routers
const questionRouter = require('./questions');

const { protect, authorize } = require('../middleware/auth');

// Re-Route into other resource routers
router.use('/:webinarId/questions', questionRouter);

router
  .route('/')
  .get(getWebinars)
  .post(protect, authorize('admin'), createWebinar);
router
  .route('/:id')
  .get(getWebinar)
  .put(protect, authorize('admin'), updateWebinar)
  .delete(protect, authorize('admin'), deleteWebinar);
router.route('/:id/photo').post(protect, authorize('admin'), uploadPhoto);

module.exports = router;

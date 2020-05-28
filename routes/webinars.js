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

router.route('/').get(getWebinars).post(createWebinar);
router.route('/:id').get(getWebinar).put(updateWebinar).delete(deleteWebinar);
router.route('/:id/photo').post(uploadPhoto);

module.exports = router;

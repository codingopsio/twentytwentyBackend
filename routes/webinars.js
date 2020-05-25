const express = require('express');
const { createWebinar, getWebinars } = require('../controllers/webinars');

const router = express.Router();

router.route('/').get(getWebinars).post(createWebinar);

module.exports = router;

const express = require("express");
const {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

// router.route("/").post(protect, createQuestion).get(protect, getQuestions);
router.route("/").get(protect, getReviews).post(protect, createReview);
router
  .route("/:reviewId")
  .delete(protect, deleteReview)
  .put(protect, updateReview);

module.exports = router;

const express = require("express");
const {
  createQuestion,
  updateQuestion,
  getQuestions,
  getQuestion,
  deleteQuestion,
  replyQuestion,
  deleteReply,
} = require("../controllers/questions");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.route("/").post(protect, createQuestion).get(protect, getQuestions);
router
  .route("/:questionId")
  .post(protect, replyQuestion)
  .put(protect, updateQuestion)
  .get(protect, getQuestion)
  .delete(protect, deleteQuestion);

router.route("/:questionId/:replyId").delete(protect, deleteReply);

module.exports = router;

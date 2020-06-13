const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  description: {
    type: String,
    min: 5,
    max: 200,
    required: [true, "Please add some description"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  webinar: {
    type: mongoose.Schema.ObjectId,
    ref: "Webinar",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);

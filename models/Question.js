const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
    maxlength: 80,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: 800,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  replies: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: 'name' },
      },
      description: {
        type: String,
        required: [true, 'Please add a reply'],
        maxlength: 800,
      },
      photo: {
        type: String,
        default: 'no-photo.jpg',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  webinar: {
    type: mongoose.Schema.ObjectId,
    ref: 'Webinar',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

QuestionSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Question', QuestionSchema);

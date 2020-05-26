const mongoose = require('mongoose');
const slugify = require('slugify');

const WebinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [70, 'Title cannot be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  time: {
    type: String,
    match: [
      /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
      'Please add correct time in 12 Hour format eg: 02:50',
    ],
  },
  plan: {
    type: String,
    required: true,
    enum: ['Free', 'Paid'],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 10'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  CourseStructure: {
    type: [String],
    required: true,
    validate: [(value) => value.length > 0],
  },
  ManageTopics: {
    type: [String],
    required: true,
    enum: [
      'Javascript',
      'Fullstack',
      'Frontend',
      'Backend',
      'Mobile Development',
      'React',
      'Node',
      'Angular',
      'Docker',
      'AWS',
      'Python',
      'Css',
      'React Native',
    ],
    validate: [(value) => value.length > 0],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

WebinarSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lowercase: true });
  next();
});

module.exports = mongoose.model('Webinar', WebinarSchema);

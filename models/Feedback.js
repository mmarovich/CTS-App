const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  classCode: {
    type: String,
    required: true
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  sessionDate: {
    type: Date,
    required: true
  },
  sessionLength: {
    type: String,
    required: true
  },
  topicsCovered: {
    type: [String],
    required: true
  },
  sessionHelpful: {
    type: Number,
    required: true
  },
  tutorInterest: {
    type: Number,
    required: true
  },
  continuedUnderstanding: {
    type: Number,
    required: true
  },
  studyHours: {
    type: String,
    required: true
  },
  officeHours: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
})

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
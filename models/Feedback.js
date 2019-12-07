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
  email: {
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
  length: {
    type: String,
    required: true
  },
  sessionDate: {
    type: Date,
    required: true
  },
  topics: {
    type: [String],
    required: true
  },
  helped: {
    type: Number,
    required: true
  },
  tutorInterest: {
    type: Number,
    required: true
  },
  continueTopic: {
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
  },
  privateComments: {
    type: String
  }
})

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
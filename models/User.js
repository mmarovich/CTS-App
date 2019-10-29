const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: String,
  maidenName: String,
  nickName: String,
  accountStatus: String,
  timezone: String,
  curriculum: [String],
  lastAssigned: Date,
  queueNum: Number,
  studentsWanted: Number,
  studentsAssigned: Number,
  PTorFTstudents: [String],
  earlyStudentsOnly: Boolean,
  tutorLevel: String,
  Unis4InPerson: [String],
  nativeEnglish: Boolean,
  languages: [String],
  timesAvailable: [String],
  daysAvailable: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);

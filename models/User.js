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
  middleName: {
    type: String,
    default: ""
  },
  maidenName: {
    type: String,
    default: ""
  },
  nickName: {
    type: String,
    default: ""
  },
  accountStatus: {
    type: String,
    default: "inactive"
  },
  timezone: {
    type: String,
    default: ""
  },
  curriculum: {
    type: [String],
    default: []
  },
  lastAssigned: {
    type: Date,
    default: null
  },
  queueNum: {
    type: Number,
    default: null
  },
  studentsWanted: {
    type: Number,
    default: 0
  },
  studentsAssigned: {
    type: Number,
    default: 0
  },
  PTorFTstudents: {
    type: [String],
    default: ["PT", "FT"]
  },
  earlyStudentsOnly: {
    type: Boolean,
    default: false
  },
  level: {
    type: String,
    default: "tutor"
  },
  Unis4InPerson: {
    type: [String],
    default: []
  },
  nativeEnglish: {
    type: Boolean,
    default: true
  },
  languages: {
    type: [String],
    default: []
  },
  timesAvailable: {
    type: [String],
    default: []
  },
  daysAvailable: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);

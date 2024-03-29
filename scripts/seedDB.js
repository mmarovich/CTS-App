const mongoose = require("mongoose");
const db = require("../models");
const faker = require('faker');
const moment = require('moment-timezone');

mongoose.connect(
  "mongodb://localhost/CTS-db",
  { useNewUrlParser: true, useUnifiedTopology: true }
);


let fakeUsers = [];
const curriculumValues = [
  { value: "FSF", probability: .7 },
  { value: "DV", probability: .5 },
  { value: "UXUI", probability: .05 },
  { value: "Cyber", probability: .1 },
  { value: "FinTech", probability: .2 }
]

const timezones = [
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "Europe/London",
  "Australia/Perth",
  "Australia/Melbourne"
]

const randomizeTimezones = () => {
  return timezones[[Math.floor(Math.random() * 5)]]
}

const timeOptions = [
  ["06", "07", "08"],
  ["09", "10", "11"],
  ["12", "13", "14", "15", "16"],
  ["17", "18", "19"],
  ["20", "21"]
]

const randomizeTimesAvailable = () => {
  let tutorChoices = []
  for (let i = 0; i < timeOptions.length; i++) {
    if (Math.random() >= 0.7) {
      tutorChoices = tutorChoices.concat(timeOptions[i])
    }
  }

  if (tutorChoices.length === 0) {
    randomizeTimesAvailable()
  } else {
    return tutorChoices;
  }
}

const dayOptions = [
  "Mondays", "Tuesdays", "Wednesdays", "Thursdays",
  "Fridays", "Saturdays", "Sundays"
]

const randomizeDaysAvailable = () => {
  let tutorChoices = [];
  for (let i = 0; i < dayOptions.length; i++) {
    if (Math.random() >= 0.7) {
      tutorChoices = tutorChoices.concat(dayOptions[i])
    }
  }

  if (tutorChoices.length === 0) {
    randomizeDaysAvailable()
  } else {
    return tutorChoices;
  }
}

const buildCurric = () => {
  let curricArray = []
  Object.keys(curriculumValues).forEach(function(key) {
    if (Math.random() < curriculumValues[key].probability) {
      curricArray.push(curriculumValues[key].value)
    }
  })

  return curricArray;
}

const randomizeFTPT = () => {
  const options = ["FT", "PT"];
  let tutorsChoice = []
  for (let i = 0; i < options.length; i++) {
    if (Math.random() >= 0.5) {
      tutorsChoice.push(options[i])
    }
  }

  if (tutorsChoice.length === 0) {
    randomizeFTPT();
  } else {
    return tutorsChoice;
  }
}

const randomizeEarly = () => {
  const options = [true, false];
  let tutorsChoice = Math.random() < .8 ? false : true;
  return tutorsChoice;
}

const randomizeNative = () => {
  const options = [true, false];
  let tutorsChoice = Math.random() < .9 ? true : false;
  return tutorsChoice;
}

const randomizeLanguages = () => {
  const languages = ["Spanish", "Chinese", "Hindi"];
  let tutorsChoice = [];
  for (let i = 0; i < languages.length; i++) {
    if (Math.random() < .05) {
      tutorsChoice.push(languages[i])
    }
  }

  return tutorsChoice;
}

const sixMago = moment().subtract(6, 'months');
const now = moment();

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}


for (var i = 0; i < 200; i++) {
  const timezone = ["PST", "MST", "CST", "EST"][Math.floor(Math.random() * 4)]
  let studentsWanted = Math.floor(Math.random() * (50 - 0 + 1)) + 0
  const studentsAssigned = studentsWanted - Math.floor(Math.random() * (studentsWanted - 0 + 1)) + 0
  let accountStatus = ['hold', 'inactive', 'active', 'resigned'][Math.floor(Math.random() * 4)]


  if (studentsWanted === 0 && accountStatus === 'active') {
    accountStatus = 'inactive'
  } else if (studentsWanted !== 0 && accountStatus === 'inactive') {
    studentsWanted = 0
  }

  fakeUsers.push({
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: null,
    maidenName: null,
    nickName: null,
    accountStatus: accountStatus,
    timezone: randomizeTimezones(),
    curriculum: buildCurric(),
    lastAssigned: randomDate(sixMago, now),
    studentsWanted: studentsWanted,
    studentsAssigned: studentsAssigned,
    PTorFTstudents: randomizeFTPT(),
    earlyStudentsOnly: randomizeEarly(),
    level: ["tutor", "senior tutor"][Math.round(Math.random())],
    Unis4InPerson: [],
    nativeEnglish: randomizeNative(),
    languages: randomizeLanguages(),
    timesAvailable: randomizeTimesAvailable(),
    daysAvailable: randomizeDaysAvailable()
  })
}

const sortedTutors = fakeUsers.sort(function(a,b){
  return new Date(a.lastAssigned) - new Date(b.lastAssigned);
});


db.User
  .deleteMany({})
  .then(() => db.User.insertMany(sortedTutors))
  .then(data => {

    console.log(data)

    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
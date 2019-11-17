const db = require("../models");
const _ = require("lodash")

module.exports = {
  updateName: function (req, res) {
    const {
      email, firstName, lastName,
      middleName, maidenName, nickName
    } = req.body;

    db.User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          firstName, lastName, middleName,
          maidenName, nickName
        }
      },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json({ msg: "Name Updated!" })
      }
    )
  },
  updateTimezone: function (req, res) {
    const { email, timezone } = req.body;

    db.User.findOneAndUpdate(
      { email },
      { $set: { timezone } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        res.send(`Timezone Updated to ${user.timezone}!`)
      }
    )
  },
  updateCurriculum: function (req, res) {
    const { email, curriculum } = req.body;

    db.User.findOneAndUpdate(
      { email },
      { $set: { curriculum } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        res.send("Curriculum Preferences Updated! We'll send you " + user.curriculum.join(', ').replace(/,(?!.*,)/gmi, ' and') + " students!")
      }
    )
  },
  updateDaysAvailable: async (req, res) => {
    const { email, daysAvailable } = req.body;
    const response = await db.User.findOneAndUpdate(
      { email },
      { $set: { daysAvailable } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.send("Days Saved!")
      }
    )
  },
  updateTimesAvailable: async (req, res) => {
    const { email, timesAvailable} = req.body;
    const response = await db.User.findOneAndUpdate(
      {email},
      { $set: {timesAvailable}},
      {new: true},
      (err, user) => {
        if (err) {
          console.log(err)
        }

        res.send("Times Saved!")
      }
    )
  },
  updatePTorFT: function (req, res) {
    const { email, PTorFTstudents } = req.body;

    db.User.findOneAndUpdate(
      { email },
      { $set: { PTorFTstudents } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.send(user.PTorFTstudents.length === 0 ? 
          `Please choose which students to receive...` :
          `We will assign you ${user.PTorFTstudents.join(" and ")} students!`)
      }
    )
  },
  updateUnis4InPerson: async(req, res) => {
    const { email, Unis4InPerson } = req.body;

    await db.User.findOneAndUpdate(
      { email },
      {
        $set: { Unis4InPerson }
      },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.send("If we find any students at " + 
        user.Unis4InPerson.join(', ').replace(/,(?!.*,)/gmi, ' or') +
        " we'll send them your way!")
      }
    )
  },
  updateEarly: function (req, res) {
    const { email, earlyStudentsOnly } = req.body;

    db.User.findOneAndUpdate(
      { email },
      { $set: { earlyStudentsOnly } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json(
          { msg: `We will assign you ${user.earlyStudentsOnly ? "early-course students only!" : "both early and late-course students!"}` })
      }
    )
  },
  updateNativeEnglish: function (req, res) {
    const { email, nativeEnglish } = req.body;

    db.User.findOneAndUpdate(
      { email },
      { $set: { nativeEnglish } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json(
          { msg: `You are now set as a ${user.nativeEnglish ? "native English speaker!" : "non-native English speaker.  Be sure to tell us which languages you speak!"}` })
      }
    )
  },
  updateLanguages: function (req, res) {
    const { email, languages } = req.body;

    db.User.findOneAndUpdate(
      { email },
      { $set: { languages } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json({ msg: `Languages updated. You speak ${user.languages.join(', ').replace(/,(?!.*,)/gmi, ' and')}!` })
      }
    )
  },
  getTutorInfo: async (req, res) => {
    const { email } = req.body;
    const tutorInfo = await db.User.findOne({ email })

    var newTutorInfo = _.omit(tutorInfo.toObject(), ['password']);

    res.send(newTutorInfo)
  },
  updateStudentsWanted: async (req, res) => {
    const { email, studentsWanted } = req.body;
    console.log(email);
    await db.User.findOneAndUpdate(
      { email },
      {
        $set: { studentsWanted }
      },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.send(`You now want ${user.studentsWanted} more students!`)
      }
    )
  }
}
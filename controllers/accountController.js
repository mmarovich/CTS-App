const db = require("../models");

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

        console.log(user)
        res.status(400).json({ msg: "Timezone Updated!" })
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

        console.log(user)
        res.status(400).json({ msg: "Curriculum Preferences Updated!"})
      }
    )
  },
  updatePTorFT: function(req, res) {
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
        res.status(400).json(
          { msg: `We will assign you ${user.PTorFTstudents.join(" and ")} students!`})
      }
    )
  },
  updateEarly: function(req, res) {
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
          { msg: `We will assign you ${user.earlyStudentsOnly ? "early-course students only!" : "both early and late-course students!"}`})
      }
    )
  },
  updateNativeEnglish: function(req, res) {
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
          { msg: `You are now set as a ${user.nativeEnglish ? "native English speaker!" : "non-native English speaker.  Be sure to tell us which languages you speak!"}`})
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
        res.status(400).json({ msg: `Languages updated. You speak ${user.languages.join(', ').replace(/,(?!.*,)/gmi, ' and')}!`})
      }
    )
  }
}
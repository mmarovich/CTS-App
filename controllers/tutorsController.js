const db = require("../models");
const _ = require("lodash")

module.exports = {
  findAll: function (req, res) {
    db.User.find({}, (err, tutors) => {
      if (err) {
        console.log(err)
      }

      const allTutors = _.map(tutors, tutor => 
        _.omit(tutor.toObject(), ['password'])
      )

      res.send(allTutors)
    })
  },
  findHold: async (req, res) => {
    const holdTutors = await db.User.find({accountStatus: 'hold'})
    res.send(holdTutors)
  },
  findActive: async (req, res) => {
    const activeTutors = await db.User.find({accountStatus: 'active'})
    res.send(activeTutors)
  },
  findInactive: async (req, res) => {
    const inactiveTutors = await db.User.find({accountStatus: 'inactive'})
    res.send(inactiveTutors)
  },
  findResigned: async (req, res) => {
    const resignTutors = await db.User.find({accountStatus: 'resigned'})
    res.send(resignTutors)
  },
  update: function (req, res) {
    const { email, studentsWanted } = req.body;

    db.User.findOne({ email }, (err, user) => {
      if (err) console.log(err);
      const timezoneCheck = user.timezone ? user.timezone : null;
      const curriculumCheck = user.curriculum.length ? user.curriculum : null;
      const timesAvailableCheck = user.timesAvailable.length ? user.timesAvailable : null;
      const daysAvailableCheck = user.daysAvailable.length ? user.daysAvailable : null;

      if (!timezoneCheck || !curriculumCheck ||
        !timesAvailableCheck || !daysAvailableCheck) {
        res.json({
          msg: `Tutor still needs to set: ${timezoneCheck ? "" : "|Timezone|"}${curriculumCheck ? "" : "|Curriculum|"}${timesAvailableCheck ? "" : "|Times Available|"}${daysAvailableCheck ? "" : "|Days Available"}`
        })
      } else {
        db.User.findOneAndUpdate(
          { email: email },
          { $set: { studentsWanted, accountStatus: "active" } },
          { new: true },
          (err, user) => {
            if (err) {
              console.log(err)
            }

            res.json({ msg: `Tutor was thrown in for ${user.studentsWanted} students!` })
          }
        )
      }
    });
  }
}
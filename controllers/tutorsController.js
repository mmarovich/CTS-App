const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.User.find({}, (err, tutors) => {
      if (err) {
        console.log(err)
      }

      res.json({ tutors })
    })
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
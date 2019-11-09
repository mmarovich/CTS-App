const db = require("../models");

module.exports = {
  assignTutor: function (req, res) {
    const { email } = req.body;

    db.User.findOneAndUpdate(
      { email },
      {
        $inc: {
          studentsWanted: -1
        },
        $set: {
          lastAssigned: new Date()
        }
      },
      {new: true},
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.json({ msg: `Tutor is now in queue for ${user.studentsWanted}` })
      }
    )
  },
  throwIn: function (req, res) {
    const { email, studentsWanted } = req.body;

    if (studentsWanted <= 0) {
      res.json({msg: 'Please set the number of students this tutor wants.'})
    } else {
      db.User.findOne({ email }, (err, user) => {
        if (err) console.log(err);
        const timezoneCheck = user.timezone ? user.timezone : null;
        const curriculumCheck = user.curriculum.length ? user.curriculum : null;
        const timesAvailableCheck = user.timesAvailable.length ? user.timesAvailable : null;
        const daysAvailableCheck = user.daysAvailable.length ? user.daysAvailable : null;

        if (!timezoneCheck || !curriculumCheck ||
          !timesAvailableCheck || !daysAvailableCheck) {
          res.json({
            msg: `${user.firstName} still needs to set: ${timezoneCheck ? "" : "|Timezone|"}${curriculumCheck ? "" : "|Curriculum|"}${timesAvailableCheck ? "" : "|Times Available|"}${daysAvailableCheck ? "" : "|Days Available"}`
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

              res.json({ msg: `${user.firstName} ${user.lastName} was thrown in for ${user.studentsWanted} students!` })
            }
          )
        }
      });
    }
  }
}
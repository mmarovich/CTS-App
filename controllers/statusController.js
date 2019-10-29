const db = require("../models");

module.exports = {
  updateStatus: function (req, res) {
    const { email, accountStatus } = req.body;

    db.User.findOneAndUpdate(
      { email: email },
      { $set: { accountStatus } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json({ msg: `Tutor is now ${user.accountStatus}!` })
      }
    )
  },
  updateLevel: function (req, res) {
    const { email, tutorLevel } = req.body;

    db.User.findOneAndUpdate(
      { email: email },
      { $set: { tutorLevel } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json({ msg: `Tutor is now a ${user.tutorLevel} level tutor!` })
      }
    )
  }
}
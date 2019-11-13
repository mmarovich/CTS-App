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
      
        res.send(`Tutor is now ${user.accountStatus}!`)
      }
    )
  },
  updateLevel: function (req, res) {
    const { email, level } = req.body;

    db.User.findOneAndUpdate(
      { email: email },
      { $set: { level } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        res.status(400).json({ msg: `Tutor is now a ${user.level} level tutor!` })
      }
    )
  }
}
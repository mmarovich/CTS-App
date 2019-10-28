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
        $set: {firstName, lastName, middleName,
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
      {
        $set: {timezone}
      },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err)
        }

        console.log(user)
        res.status(400).json({ msg: "Timezone Updated!" })
      }
    )
  }
}
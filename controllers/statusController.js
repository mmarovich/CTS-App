const db = require("../models");

module.exports = {
  update: function (req, res) {
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
        res.status(400).json({ msg: "Account Updated!" })
      }
    )
  }
}
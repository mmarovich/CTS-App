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
        res.status(400).json(
          { msg: `Tutor is now in queue for ${user.studentsWanted}` })
      }
    )
  }
}
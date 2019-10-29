const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    console.log("here")
    db.User.find({}, (err, tutors) => {
      if (err) {
        console.log(err)
      }

      res.status(400).json({tutors})
    })
  },
}
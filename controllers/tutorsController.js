const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.find({}, (err, tutors) => {
      if (err) {
        console.log(err)
      }

      res.json({tutors})
    })
  },
}
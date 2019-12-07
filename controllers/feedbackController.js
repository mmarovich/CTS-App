const db = require("../models");

const _ = require("lodash")

module.exports = {
  new: (req, res) => {
    
    db.Feedback.create(req.body, (err, feedback) => {
      if (err) {
        console.log(err)
      }

      console.log(feedback)
      res.send(`feedback posted`)
    })

    // const newFeedback = new Feedback({
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   email: req.body.email,
    //   classCode: req.body.classCode,
    //   tutor: req.body.tutor,
    //   length: req.body.length,
    //   sessionDate: req.body.sessionDate,
    //   topics: req.body.topics,
    //   helped: req.body.helped,
    //   tutorInterest: req.body.tutorInterest,
    //   continueTopic: req.body.continueTopic,
    //   studyHours: req.body.studyHours,
    //   officeHours: req.body.officeHours,
    //   comments: req.body.comments,
    //   privateComments: req.body.privateComments
    // })
  }
}
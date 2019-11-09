const db = require("../models");
const _ = require("lodash")

module.exports = {
  findAll: function (req, res) {
    db.User.find({}, (err, tutors) => {
      if (err) {
        console.log(err)
      }

      const allTutors = _.map(tutors, tutor =>
        _.omit(tutor.toObject(), ['password'])
      )

      res.send(allTutors)
    })
  },
  findHold: async (req, res) => {
    const holdTutors = await db.User.find({ accountStatus: 'hold' })
    res.send(holdTutors)
  },
  findActive: async (req, res) => {
    const activeTutors = await db.User.find({ accountStatus: 'active' })
    
    const sortedActives = activeTutors.sort(function(a,b){
      return new Date(a.lastAssigned) - new Date(b.lastAssigned);
    });
    
    res.send(sortedActives)
  },
  findInactive: async (req, res) => {
    const inactiveTutors = await db.User.find({ accountStatus: 'inactive' })
    
    const sortedInactives = inactiveTutors.sort(function(a,b){
      return new Date(a.lastAssigned) - new Date(b.lastAssigned);
    });
    
    res.send(sortedInactives)
  },
  findResigned: async (req, res) => {
    const resignTutors = await db.User.find({ accountStatus: 'resigned' })
    res.send(resignTutors)
  }
}
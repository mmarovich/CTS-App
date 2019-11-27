const router = require("express").Router();
const tutorsController = require("../../../controllers/tutorsController");
const statusController = require("../../../controllers/statusController");
const queueController = require("../../../controllers/queueController");

router.route("/tutors")
  .get(tutorsController.findAll)

router.route("/tutorNames")
  .get(tutorsController.findAllNames)

router.route("/holdTutors")
  .get(tutorsController.findHold)

router.route("/activeTutors")
  .get(tutorsController.findActive)
  .put(queueController.assignTutor)

router.route("/inactiveTutors")
  .get(tutorsController.findInactive)
  .put(queueController.throwIn)

router.route("/resignTutors")
  .get(tutorsController.findResigned)

router.route("/tutorStatus")
  .put(statusController.updateStatus);

router.route("/level")
  .put(statusController.updateLevel);

router.route("/assignTutor")
  .put(queueController.assignTutor);

module.exports = router;
const router = require("express").Router();
const tutorsController = require("../../../controllers/tutorsController");
const statusController = require("../../../controllers/statusController");
const queueController = require("../../../controllers/queueController");

router.route("/tutors")
  .get(tutorsController.findAll);

router.route("/tutorStatus")
  .put(statusController.updateStatus);

router.route("/level")
  .put(statusController.updateLevel);

router.route("/assignTutor")
  .put(queueController.assignTutor);

module.exports = router;
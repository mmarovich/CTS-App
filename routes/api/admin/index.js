const router = require("express").Router();
const tutorsController = require("../../../controllers/tutorsController");
const statusController = require("../../../controllers/statusController");

router.route("/tutors")
  .get(tutorsController.findAll);

router.route("/tutorStatus")
  .put(statusController.update);

module.exports = router;
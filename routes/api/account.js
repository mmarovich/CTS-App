const express = require("express");
const router = express.Router();

const accountController = require("../../controllers/accountController");

router.route("/tutor")
  .post(accountController.getTutorInfo)

router.route("/name")
  .put(accountController.updateName)

router.route("/studentsWanted")
  .put(accountController.updateStudentsWanted)

router.route("/timezone")
  .put(accountController.updateTimezone)

router.route("/curriculum")
  .put(accountController.updateCurriculum)

router.route("/daysAvailable")
  .put(accountController.updateDaysAvailable)

router.route("/timesAvailable")
  .put(accountController.updateTimesAvailable)

router.route("/PTorFT")
  .put(accountController.updatePTorFT)

router.route("/earlyStudents")
  .put(accountController.updateEarly)

router.route("/nativeEnglish")
  .put(accountController.updateNativeEnglish)

router.route("/languages")
  .put(accountController.updateLanguages)

module.exports = router;
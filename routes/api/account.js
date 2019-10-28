const express = require("express");
const router = express.Router();

const accountController = require("../../controllers/accountController");

router.route("/name")
  .put(accountController.updateName)

router.route("/timezone")
  .put(accountController.updateTimezone)

module.exports = router;
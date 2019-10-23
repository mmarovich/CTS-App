const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

// @route POST api/users/register
router.route("/register")
  .post(userController.create);

// @route POST api/users/login
router.route("/login")
  .post(userController.login);

module.exports = router;

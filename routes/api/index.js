const router = require("express").Router();
const userRoutes = require("./users");
const adminRoutes = require("./admin");
const accountRoutes = require("./account")

// API routes
router.use("/users", userRoutes);

router.use("/admin", adminRoutes);

router.use("/account", accountRoutes);

module.exports = router;
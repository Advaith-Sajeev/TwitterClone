const express = require("express");
const { allUser } = require("../Controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUser);

module.exports = router;

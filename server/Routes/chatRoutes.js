const express = require("express");
const {
  accessChat,
  fetchChats,
  fetchGroups,
  createGroupChat,
} = require("../Controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(fetchChats);
router.route("/fetchGropus").get(fetchGroups);
router.route("/createGropu").post(createGroupChat);

module.exports = router;

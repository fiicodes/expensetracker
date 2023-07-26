const express = require("express");
const router = express.Router();

const {
  getAllFriends,
  getFriend,
  createFriend,
  deleteFriend,
  updateFriend,
} = require("../controllers/friend");

router.route("/").post(createFriend).get(getAllFriends);
router.route("/:id").get(getFriend).patch(updateFriend).delete(deleteFriend);

module.exports = router;

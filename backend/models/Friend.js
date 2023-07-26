// friend.js
const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please  provide a user"],
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;

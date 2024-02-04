const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);

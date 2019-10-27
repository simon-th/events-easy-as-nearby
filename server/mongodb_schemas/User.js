const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    saved_event: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "user_info");

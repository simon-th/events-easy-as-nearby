// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UserSchema = new Schema(
  {
    username: String,
    email: String,
    saved_event: [String]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema, "user_information");

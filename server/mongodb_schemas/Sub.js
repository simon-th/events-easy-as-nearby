const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubSchema = new Schema(
  {
    email: String,
  }
);

module.exports = mongoose.model("Sub", SubSchema, "subs_list");

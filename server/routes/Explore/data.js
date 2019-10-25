const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const EventSchema = new Schema(
  {
    name: String,
    summary: String,
    description: String,
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Event", EventSchema, "event_info");

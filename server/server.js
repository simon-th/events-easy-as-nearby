if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const app = express();
const router = express.Router();
const CONNECTION_URL = "mongodb+srv://"+process.env.NODE_ENV+"@explocationdb-qtiwe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "explocation_database";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true});
mongoose.Promise = global.Promise;
console.log(process.env.DATABASE_KEY);
let db = mongoose.connection;
db.once("open", () => console.log("connected to database"));
db.on("error", console.error.bind(console, "Mongo connection error"));
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

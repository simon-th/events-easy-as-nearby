const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var cors = require("cors");
const CONNECTION_URL = "mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "explocation_database";
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URL);
const path = require(`path`);

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//create a GET route
app.get('/backend', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND IS CONNECTED TO EXPLOCATION' });
});

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/form.html'));
});
app.get('/map', (req, res) => {

});

app.get('/about', (req, res) => {
  res.send({ express: 'Github stat'});
});

app.get('/event', (req, res) => {
  res.send({ express: 'Map with events'});
});

app.post('/submit', (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message
  });
  res.send('Thanks for your message!');
});

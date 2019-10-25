const mongoose = require('mongoose');
//require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Event = require('./data');

const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  "mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/explocation?retryWrites=true&w=majority";

mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/geteventlist', (req, res) => {
  Event.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
  //res.send('list');
});

router.get('*', (req, res) => {
    res.send('testingexplore');
})



module.exports = router;

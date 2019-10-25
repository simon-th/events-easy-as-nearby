const mongoose = require('mongoose');
//require('dotenv').config();
var router = require('express').Router();
const User = require('./data');

const dbRoute =
  "mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.post('/newuser', (req, res) => {
  console.log("reached");
  let user = new User();

  const { username, email } = req.body;

  if (!username || !email) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  user.username = username;
  user.email = email;
  user.saved_event = "";
  user.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/getuser', (req, res) => {
  res.send('testing');
});

module.exports = router;

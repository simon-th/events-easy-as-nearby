const mongoose = require('mongoose');
const express = require('express');
//require('dotenv').config();
// var router = require('express').Router();
const User = require('./data');

// const app = express();
// app.use(cors());
const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(logger('dev'));

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

router.get('/test', (req, res) => {
  res.send('signup api route works!');
})

module.exports = router;

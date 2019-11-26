const express = require('express');
const User = require('../mongodb_schemas/User');
const Sub = require('../mongodb_schemas/Sub');
const utils = require('../utils');

const router = express.Router();

router.post('/newuser', async (req, res) => {
  let user = new User();

  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(100).json(utils.getError('Error: Invalid Inputs.', {username: username, email: email}));
  }

  user.username = username;
  user.email = email;
  user.saved_event = [];
  try {
    await user.save();
    return res.status(201).json(utils.getSuccess('User created successfully.', user));
  } catch (error) {
    return res.status(500).json(utils.getError('Database error: Failed to create user.'), error);
  }
});

router.post('/newsub', async (req, res) => {
  let sub = new Sub();
  const { email } = req.body;

  if (!email) {
    return res.status(100).json(utils.getError('Error: Invalid Inputs.', {username: username, email: email}));
  }

  sub.email = email;
  try {
    await sub.save();
    return res.status(201).json(utils.getSuccess('Subscriber added successfully.', user));
  } catch (error) {
    return res.status(500).json(utils.getError('Database error: Failed to add subscriber.'), error);
  }
})

router.delete('/unsub', async (req, res) => {
  const { email } = req.body;
  try {
    await Sub.findOneAndDelete(email);
    return res.status(200).json(utils.getSuccess('Subscriber removed successfully.', user));
  } catch (error) {
    return res.status(500).json(utils.getError('Database error: Failed to remove subscriber.'), error);
  }
})

router.get('/sublist', async (req, res) => {
  try {
    const data = await Sub.find();
    return res.status(200).json(utils.getSuccess('Subscriber list returned successfully.', data));
  } catch (error) {
    return res.status(500).json(utils.getError('Database error: Failed to return subscriber list.'), error);
  }
})

router.get('/test', (req, res) => {
  res.send('signup api route works!');
})

module.exports = router;

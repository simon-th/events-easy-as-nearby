const express = require('express');
const User = require('../../mongodb_schemas/User');
const router = express.Router();

router.post('*', (req, res) => {

  const { email, event_id } = req.body;

  if (!email || !event_id) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  } else {
    User.findOneAndUpdate({"email": saved_event.email}, {"$push": {"saved_event": saved_event.event_id}}, { new: true, safe: true, upsert: true }).then((result) => {
        return res.status(201).json({
            status: "Success",
            message: "Resources Are Created Successfully",
            data: result
        });
    }).catch((error) => {
        return res.status(500).json({
            status: "Failed",
            message: "Database Error",
            data: error
        });
    });
  }

  let saved_event = new User();
  saved_event.email = email;
  saved_event.event_id = event_id;
  console.log(saved_event.email);
  console.log(saved_event.event_id);
  User.findOneAndUpdate({"email": saved_event.email}, {"$push": {"saved_event": saved_event.event_id}}, { new: true, safe: true, upsert: true }).then((result) => {
      return res.status(201).json({
          status: "Success",
          message: "Resources Are Created Successfully",
          data: result
      });
  }).catch((error) => {
      return res.status(500).json({
          status: "Failed",
          message: "Database Error",
          data: error
      });
  });
})

router.get('*', (req, res) => {
  console.log('test');
})

module.exports = router;

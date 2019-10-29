const express = require('express');
const User = require('../../mongodb_schemas/User');
const Event = require('../../mongodb_schemas/Event');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('test saved events');
});

router.get('/savelist', async (req, res) => {
  try {
    var events = [];
    const email = req.query.email;

    let data = await User.find({ email: email });

    if (data) {
      for (const id of data[0].saved_event) {
        let response = await Event.find({id : id });
        events.push(response[0]);
      };
      res.status(200).json(events);
    } else res.status(404).json({message: 'aiya'});
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;

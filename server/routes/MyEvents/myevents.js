const express = require('express');
const User = require('../../mongodb_schemas/User');
const Event = require('../../mongodb_schemas/Event');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('test saved events');
});

async function getUserEvents(eventIds) {
  var events = [];
  eventIds.forEach(async (id) => {
    await Event.find({ id: id })
      .exec()
      .then(data => {
        if (data) {
          console.log(data[0].name);
          events.push(data[0]);
        }
        else return null;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }, () => {
    console.log(events);
    return events;
  });
}

router.get('/savelist', async (req, res) => {
  try {
    var events = [];
    const email = req.query.email;

    await User.find({ email: email })
      .exec()
      .then(async (data) => {

        if (data) {
          console.log(data[0].saved_event);
          for (const id of data[0].saved_event) {
            let response = await Event.find({id : id });
            events.push(response[0]);
          };
          res.status(200).json(events);
        }
        else res.status(404).json({message: 'aiya'});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
      });
  } catch(error) {
    console.log(error);
  }
});


module.exports = router;

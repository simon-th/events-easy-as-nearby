const mongoose = require('mongoose');

const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;
db.once('open', () => {
  console.log('connected to database from server.js');
});
db.on('error', () => {
  console.error.bind(console, 'Mongo connection error');
});

beforeEach((done) => {
    mongoose.connection.collections.test.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    });
});

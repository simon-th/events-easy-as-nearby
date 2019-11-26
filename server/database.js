let mongoose = require('mongoose');
const DATABASE_NAME = 'explocation';
const CONNECTION_URL = `mongodb+srv://huy0123:huy_utexas@explocationdb-qtiwe.gcp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.once('open', () => {
      console.log('connected to database from server.js');
    });
    db.on('error', () => {
      console.error.bind(console, 'Mongo connection error');
    });
  }
}

module.exports = new Database();

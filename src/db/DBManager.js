const mongoose = require('mongoose');

class DBManager {
  constructor(config) {
    this._config = config;
  }
  getMongoUrl() {
    return this._config.MONGODB_URI;
    //return this._config.MONGODB_URI_PROD;
  }
  connect() {
    return mongoose.connect(this.getMongoUrl(), {
      useNewUrlParser: true,
      useCreateIndex: true, //, useFindAndModify: false // to avoid warning of deprecated functions
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
    });
  }
}

module.exports = {
  DBManager
};
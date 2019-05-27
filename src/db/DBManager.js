const mongoose = require('mongoose');

class DBManager {
  constructor(config) {
    this._config = config;
  }
  getMongoUrl() {
    return this._config.MONGODB_URI;
  }
  connect() {
    return mongoose.connect(this.getMongoUrl(), {
      useNewUrlParser: true,
      useCreateIndex: true //, useFindAndModify: false // to avoid warning of deprecated functions
    });
  }
}

module.exports = { DBManager };

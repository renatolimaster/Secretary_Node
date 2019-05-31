const mongoose = require('mongoose');
const { publisherSchema } = require('./schema');

publisherSchema.pre('save', function(next) {
  console.log('publisherSchema pre save');
  next();
});

const Publisher = mongoose.model('publishers', publisherSchema); // the name will put on plural by mongo

module.exports = {
  Publisher
};

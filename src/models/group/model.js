const mongoose = require('mongoose');

const {
  groupSchema
} = require('./schema');

groupSchema.pre('save', function (next) {
  console.log('groupSchema pre save');
  next();
});

const Group = mongoose.model('groups', groupSchema);

module.exports = {
  Group
};
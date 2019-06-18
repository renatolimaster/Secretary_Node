const mongoose = require('mongoose');
const {
  fieldServiceSchema
} = require('./schema');

fieldServiceSchema.pre('save', function (next) {
  console.log('fieldServiceSchema pre save');
  next();
});

const FieldService = mongoose.model('fieldservices', fieldServiceSchema);

module.exports = {
  FieldService
}
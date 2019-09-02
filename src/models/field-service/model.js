const mongoose = require('mongoose');
const { fieldServiceSchema } = require('./schema');
const { Congregation } = require('../../models/congregation');
const { Publisher } = require('../../models/publisher');

fieldServiceSchema.pre('save', function(next) {
  console.log('fieldServiceSchema pre save');
  next();
});

fieldServiceSchema.statics.initialize = async congregationId => {
  console.log('=============== FieldService initialize =================');
  const publishers = Publisher.findByCongregation(congregationId);
  if (publishers) {
    return publishers;
  }
  return false;
};

const FieldService = mongoose.model('fieldservices', fieldServiceSchema);

module.exports = {
  FieldService,
};

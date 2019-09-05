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

fieldServiceSchema.statics.findByReferenceDateAndPublisherIdAndCongregationId = async (referenceDate, publisherId, congregationId) => {
  console.log('=============== FieldService findByReferenceDateAndPublisherIdAndCongregationId =================');
  console.log(referenceDate);
  console.log(publisherId);
  console.log(congregationId);
  const fieldservice = await FieldService.findOne({referenceDate, publisherId, congregationId});

  if (fieldservice) {
    return fieldservice;
  }

  return false;
};

const FieldService = mongoose.model('fieldservices', fieldServiceSchema);

module.exports = {
  FieldService,
};

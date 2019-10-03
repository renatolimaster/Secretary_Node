const mongoose = require('mongoose');
const { fieldServiceSchema } = require('./schema');
const { Congregation } = require('../../models/congregation');
const { Publisher } = require('../../models/publisher');
const moment = require('moment');
const log = console.log;

fieldServiceSchema.pre('save', function(next) {
  console.log('fieldServiceSchema pre save');
  next();
});

fieldServiceSchema.statics.initialize = async congregationId => {
  log('=============== FieldService initialize =================');
  const publishers = Publisher.findByCongregation(congregationId);
  if (publishers) {
    return publishers;
  }
  return false;
};

fieldServiceSchema.statics.findById = async _id => {
  log('============ FieldService findById ==============');

  const fieldservice = await FieldService.findOne({ _id })
    .populate('congregationId', '_id number name')
    .populate('publisherId', '_id fullName statusService')
    .populate('pioneerId', '_id description');

  if (fieldservice) {
    return fieldservice;
  }

  return false;
};

fieldServiceSchema.statics.getStatusOfService = async publisher => {
  log('============ FieldService getStatusOfService ==============');
  let status = '';
  let initialDate;
  let totalReference = 0;
  const firstDateNow = moment()
    .subtract(1, 'months')
    .startOf('month')
    .toDate();
  log('firstDateNow 1', firstDateNow);
  firstFieldService = moment(publisher.firstFieldService)
    .startOf('month')
    .toDate();

  log('firstFieldService', firstFieldService);
  const workedMonths = parseInt(moment(firstDateNow).diff(firstFieldService, 'months', true));
  log('workedMonths', workedMonths);

  if (workedMonths > 6) {
    totalReference = 6;
    initialDate = moment(firstDateNow)
      .subtract(5, 'months')
      .startOf('month')
      .toDate();
  } else {
    totalReference = workedMonths;
    initialDate = firstFieldService;
  }

  log('initialDate', initialDate);
  log('firstDateNow 2', firstDateNow);

  const fieldServiceCount = await FieldService.findByPublisherIdAndPeriod(publisher._id, initialDate, firstDateNow);
  log('totalReference', totalReference);
  log('fieldServiceCount', fieldServiceCount);

  if (fieldServiceCount >= totalReference) {
    status = 'Regular';
  }
  if (fieldServiceCount < totalReference) {
    status = 'Irregular';
  }
  if (fieldServiceCount === 0) {
    status = 'Inactive';
  }

  log('workedMonths', workedMonths);
  log('status', status);

  return status;
};

fieldServiceSchema.statics.findByPublisherIdAndPeriod = async (publisherId, startDate, endDate) => {
  log('============ FieldService findByPublisherIdAndPeriod ==============');

  const fieldServiceCount = await FieldService.find({
    publisherId,
    referenceDate: {
      $gte: startDate,
      $lte: endDate,
    },
    hours: { $gt: 0 },
  }).countDocuments();

  return fieldServiceCount;
};

fieldServiceSchema.statics.findByReferenceDateAndCongregationId = async (referenceDate, congregationId) => {
  log('============ FieldService findByReferenceDateAndCongregationId ==============');

  const fieldservice = await FieldService.find({ referenceDate, congregationId })
    .populate('congregationId', '_id number name')
    .populate('publisherId', '_id fullName statusService')
    .populate('pioneerId', '_id description');

  if (fieldservice.length > 0) {
    return fieldservice;
  }

  return false;
};

fieldServiceSchema.statics.findByReferenceDateAndPublisherIdAndCongregationId = async (referenceDate, publisherId, congregationId) => {
  log('============ FieldService findByReferenceDateAndPublisherIdAndCongregationId ==============');
  log('referenceDate:', referenceDate);

  const fieldservice = await FieldService.findOne({ referenceDate, publisherId, congregationId })
    .populate('congregationId', '_id number name')
    .populate('publisherId', '_id fullName statusService')
    .populate('pioneerId', '_id description');

  if (fieldservice) {
    return fieldservice;
  }
  log('fieldservice', fieldservice);

  return false;
};

const FieldService = mongoose.model('fieldservices', fieldServiceSchema);

module.exports = {
  FieldService,
};

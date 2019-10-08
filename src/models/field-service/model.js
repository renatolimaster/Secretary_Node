const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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
  /* It is necessary always to consider the previous month because only the previous month is recorded. */
  let firstDateNow = moment()
    .subtract(1, 'months')
    .startOf('month')
    .toDate();
  // To get the beginning of publisher's field service
  firstFieldService = moment(publisher.firstFieldService)
    .startOf('month')
    .toDate();

  // To parse time zone to midnight of firstDateNow
  let firstDateNowUtc = moment(firstDateNow)
    .parseZone()
    .format('YYYY-MM-DD');
  // To parse time zone to midnight of firstDateMonth
  let firstFieldServiceUtc = moment(firstFieldService)
    .parseZone()
    .format('YYYY-MM-DD');
  // To get the UTC date and time
  firstDateNow = new Date(firstDateNowUtc);
  firstFieldService = new Date(firstFieldServiceUtc);
  // To get the number of months worked
  const workedMonths = parseInt(moment(firstDateNow).diff(firstFieldService, 'months', true));

  /* 
  The rule considers only the previous 6 months worked.
  The 5 is used in initialDate because the first month is the previous of the current one. 
  In the else clause is considering that the publisher is a newbie
  */
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
  let initialDateUtc = moment(initialDate)
    .parseZone()
    .format('YYYY-MM-DD');
  // To get the number of field services worked - only with hours > 0
  const fieldServiceCount = await FieldService.findByPublisherIdAndPeriodCount(publisher._id, initialDateUtc, firstDateNow);

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

/* To count field services of period by publisher - just if has hours worked */
fieldServiceSchema.statics.findByPublisherIdAndPeriodCount = async (publisherId, startDate, endDate) => {
  log('============ FieldService findByPublisherIdAndPeriod ==============');
  startDate = new Date(startDate).toISOString();
  endDate = new Date(endDate).toISOString();
  const fieldServiceCount = await FieldService.find({
    publisherId,
    referenceDate: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .and([
      {
        $or: [{ hours: { $gt: 0 } }, { hoursBetel: { $gt: 0 } }, { creditHours: { $gt: 0 } }, { minutes: { $gt: 0 } }],
      },
    ])
    .countDocuments();
  log('publisherId: ', publisherId);
  log('startDate: ', startDate);
  log('endDate: ', endDate);
  log('fieldServiceCount', fieldServiceCount);
  return fieldServiceCount;
};
/* 
To get field service of the period by a publisher - 
just if a publisher has spent some hours worked or even minutes (minimum 15). 
*/
fieldServiceSchema.statics.findByPublisherIdAndPeriod = async (publisherId, startDate, endDate) => {
  log('============ FieldService findByPublisherIdAndPeriod ==============');
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  log('publisherId ==========>:', publisherId);
  log('startDate ==========>:', startDate);
  log('endDate ==========>:', endDate);
  const fieldService = await FieldService.findOne({
    publisherId,
    referenceDate: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .and([
      {
        $or: [{ hours: { $gt: 0 } }, { hoursBetel: { $gt: 0 } }, { creditHours: { $gt: 0 } }, { minutes: { $gt: 0 } }],
      },
    ])
    .populate('congregationId', '_id number name')
    .populate('publisherId', '_id fullName statusService')
    .populate('pioneerId', '_id description');

  log('fieldService', fieldService);
  if (fieldService !== null) {
    return fieldService;
  }

  return false;
};
/* To get average of hours according the period */
fieldServiceSchema.statics.fieldServiceAverageOfHours = async query => {
  log('============ FieldService fieldServiceAverageOfHours ==============');
  const { publisherId } = query;
  const average = await FieldService.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: publisherId,
        hours: { $avg: '$hours' },
        count: { $sum: 1 },
      },
    },
  ]);

  return average;
};
/* To get average of three, six and eleven months */
fieldServiceSchema.statics.fieldServiceRegularAverage = async publisherId => {
  log('============ FieldService fieldServiceRegularAverage ==============');

  let average = [];
  startDateThree = moment()
    .subtract(3, 'month')
    .startOf('month')
    .toDate();
  startDateSix = moment()
    .subtract(6, 'month')
    .startOf('month')
    .toDate();
  startDateEleven = moment()
    .subtract(12, 'month')
    .startOf('month')
    .toDate();
  endDate = moment()
    .subtract(1, 'month')
    .startOf('month')
    .toDate();

  // To parse time zone to midnight of start dates
  const startDateUtcThree = moment(startDateThree)
    .parseZone()
    .format('YYYY-MM-DD');
  const startDateUtcSix = moment(startDateSix)
    .parseZone()
    .format('YYYY-MM-DD');
  const startDateUtcEleven = moment(startDateEleven)
    .parseZone()
    .format('YYYY-MM-DD');
  // To parse time zone to midnight of endDate
  const endDateUtc = moment(endDate)
    .parseZone()
    .format('YYYY-MM-DD');

  query = {
    publisherId: ObjectId(publisherId),
    referenceDate: {
      $gte: new Date(startDateUtcThree),
      $lte: new Date(endDateUtc),
    },
  };

  const averageThree = await FieldService.aggregate([
    {
      $match: {
        publisherId: ObjectId(publisherId),
        referenceDate: {
          $gte: new Date(startDateUtcThree),
          $lte: new Date(endDateUtc),
        },
      },
    },
    {
      $group: {
        _id: publisherId,
        hours: { $avg: '$hours' },
        count: { $sum: 1 },
      },
    },
  ]);

  const averageSix = await FieldService.aggregate([
    {
      $match: {
        publisherId: ObjectId(publisherId),
        referenceDate: {
          $gte: new Date(startDateUtcSix),
          $lte: new Date(endDateUtc),
        },
      },
    },
    {
      $group: {
        _id: publisherId,
        hours: { $avg: '$hours' },
        count: { $sum: 1 },
      },
    },
  ]);

  const averageEleven = await FieldService.aggregate([
    {
      $match: {
        publisherId: ObjectId(publisherId),
        referenceDate: {
          $gte: new Date(startDateUtcEleven),
          $lte: new Date(endDateUtc),
        },
      },
    },
    {
      $group: {
        _id: publisherId,
        hours: { $avg: '$hours' },
        count: { $sum: 1 },
      },
    },
  ]);

  average.push(averageThree[0], averageSix[0], averageEleven[0]);

  return average;
};

fieldServiceSchema.statics.findByIdAndCongregationId = async (_id, congregationId) => {
  log('============ FieldService findByIdAndCongregationId ==============');

  const fieldservice = await FieldService.findOne({ _id, congregationId })
    .populate('congregationId', '_id number name')
    .populate('publisherId', '_id fullName statusService')
    .populate('pioneerId', '_id description');

  if (fieldservice) {
    return fieldservice;
  }

  return false;
};

fieldServiceSchema.statics.findByReferenceDateAndCongregationId = async (referenceDate, congregationId) => {
  log('============ FieldService findByReferenceDateAndCongregationId ==============');
  referenceDate = new Date(referenceDate);
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

  const fieldservice = await FieldService.findOne({ referenceDate, publisherId, congregationId })
    .populate('congregationId', '_id number name')
    .populate('publisherId', '_id fullName statusService')
    .populate('pioneerId', '_id description');

  if (fieldservice) {
    return fieldservice;
  }

  return false;
};

const FieldService = mongoose.model('fieldservices', fieldServiceSchema);

module.exports = {
  FieldService,
};

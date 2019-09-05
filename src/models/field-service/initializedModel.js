const moment = require('moment');
const firstdatePriorMonth = moment()
  .subtract(1, 'months')
  .startOf('month')
  .toDate();

const initializedTemplate = {
  referenceDate: firstdatePriorMonth,
  referenceYear: firstdatePriorMonth.getFullYear(),
  referenceMonth: firstdatePriorMonth.getMonth() + 1,
  deliveryDate: firstdatePriorMonth,
  videos: 0,
  returnVisits: 0,
  studies: 0,
  books: 0,
  brochures: 0,
  magazines: 0,
  weblinks: 0,
  campaignTracts: 0,
  tracts: 0,
  handbills: 0,
  otherpublications: 0,
  hours: 0,
  hoursBetel: 0,
  creditHours: 0,
  minutes: 0,
  notes: '',
  placements: 0,
  pioneerId: null,
  publisherId: null,
  congregationId: null,
};

module.exports = { initializedTemplate };

const moment = require('moment');
const firstDayPriorMonthUtcDate = async date => {
  let firstDayPriorMonth = moment(date)
    .subtract(1, 'months')
    .startOf('month')
    .toDate();
  let firstDayPriorMonthUtc = new Date(
    moment(firstDayPriorMonth)
      .parseZone()
      .format('YYYY-MM-DD'),
  );

  return firstDayPriorMonthUtc;
};

const utcDate = async date => {
  let referenceDate = new Date(date);
  let referenceDateUtc = moment(referenceDate)
    .parseZone()
    .toDate();

  return referenceDateUtc;
};

module.exports = { firstDayPriorMonthUtcDate, utcDate };

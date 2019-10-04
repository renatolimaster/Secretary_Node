const moment = require('moment');
const log = console.log;
const listall = ({ FieldService }, { options }) => async (req, res) => {
  log('================> FieldService listall <======================');
  let { publisherId, startDate, endDate } = req.body;
  const role = req.user.roleId.role;

  try {
    startDate = moment(startDate)
      .startOf('month')
      .toDate();
    endDate = moment(endDate)
      .startOf('month')
      .toDate();

    // To parse time zone to midnight of firstDateNow
    const startDateUtc = moment(startDate)
      .parseZone()
      .format('YYYY-MM-DD');
    // To parse time zone to midnight of firstDayReferenceMonth
    const endDateUtc = moment(endDate)
      .parseZone()
      .format('YYYY-MM-DD');

    const fieldService = FieldService.findByPublisherIdAndPeriod(publisherId, startDateUtc, endDateUtc);

    if (fieldService === false) {
      message.msg = `The field service not found.`;
      res.status(403).send(message);
    }
    log('fieldService 2', fieldService);

    /* Admin role can see all field service other roles only can see his own field service */
    if (role !== 'Admin') {
      if (fieldService.publisherId._id.toString() !== publisherId.toString()) {
        message.msg = 'The field service does not belong to the logged in user.';
        return res.status(403).send(message);
      }
    }

    return res.status(200).send(fieldService);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { listall };

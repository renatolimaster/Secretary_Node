const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { fieldServiceProjectionFull } = require('../../models/field-service/projections');
const { congregationProjectionBasic } = require('../../models/congregation/projections');
const { pioneerProjectionBasics } = require('../../models/pioneer/projections');
const { publisherProjectionBasic } = require('../../models/publisher/projections');
const { paginates } = require('../../utils/paginate');
const log = console.log;
/*  
The search function works only in the current congregation
*/
const search = ({ FieldService }) => async (req, res) => {
  log('================> FieldService listall <======================');
  let { publisherId, startDate, endDate } = req.params;
  const role = req.user.roleId.role;
  const publisherLogged = req.user.publishersId._id;
  let congregationId = req.user.publishersId.congregationId;
  let query;
  let options = {}; // limit clause return only first attribute
  let message = { msg: '' };

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

    const fieldService = await FieldService.findByPublisherIdAndPeriod(publisherId, startDateUtc, endDateUtc);

    if (fieldService === false) {
      message.msg = 'The field service not found.';
      res.status(403).send(message);
    }

    /* Admin role can see all field services other roles only can see his own field services */
    if (role !== 'Admin') {
      if (publisherLogged.toString() !== publisherId.toString()) {
        message.msg = 'The field service does not belong to the logged-in user.';
        return res.status(403).send(message);
      }
    }

    // Get field services only in the current congregation
    query = {
      publisherId: ObjectId(publisherId),
      referenceDate: {
        $gte: new Date(startDateUtc),
        $lte: new Date(endDateUtc),
      },
      congregationId: congregationId,
    };

    options = {
      select: fieldServiceProjectionFull,
      sort: { referenceDate: -1 },
      populate: [
        { path: 'publisherId', select: publisherProjectionBasic },
        { path: 'pioneerId', select: pioneerProjectionBasics },
        { path: 'congregationId', select: congregationProjectionBasic },
      ],
      lean: true,
      page: 1,
      limit: 10,
    };

    const results = await paginates(FieldService, query, options);
    // To get the average hours of the period.
    const average = await FieldService.fieldServiceAverageOfHours(query);
    // To get average of three, six and eleven months
    const averageTotal = await FieldService.fieldServiceRegularAverage(publisherId);

    if (results) {
      return res.status(200).send({ results, average, averageTotal });
    } else {
      return res.status(400).send('Docs not found!');
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { search };

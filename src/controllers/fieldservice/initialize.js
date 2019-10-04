const { message } = require('../../utils/messages');
const moment = require('moment');
let { initializedTemplate } = require('../../models/field-service/initializedModel');
const log = console.log;

const initialize = ({ FieldService, Congregation, Publisher }, { options }) => async (req, res, next) => {
  log('================> FieldService initialize <======================');
  const { congregationId } = req.params;
  const { referenceDate } = req.body;

  // First day of now date
  const firstDateNow = moment()
    .startOf('month')
    .toDate();
  // First day of reference date
  const firstDayReferenceMonth = moment(referenceDate)
    .startOf('month')
    .toDate();
  // To parse time zone to midnight of firstDateNow
  const firstDateNowUtc = moment(firstDateNow)
    .parseZone()
    .format('YYYY-MM-DD');
  // To parse time zone to midnight of firstDayReferenceMonth
  const firstDayReferenceMonthUtc = moment(firstDayReferenceMonth)
    .parseZone()
    .format('YYYY-MM-DD');

  try {
    if (firstDayReferenceMonth >= firstDateNow) {
      message.msg = 'The reference date must be previous to the current date.';
      return res.status(404).send(message);
    }
    // check if congregation exist
    const congregation = await Congregation.findById(congregationId);
    if (!congregation) {
      message.msg = 'Congregation not found!';
      return res.status(404).send(message);
    }
    // check if has publishers in the congregation
    const publishers = await Publisher.findAllByCongregation(congregationId);
    if (!publishers) {
      message.msg = 'There is no publishers linked to congregation';
      return res.status(403).send(message);
    }

    /* Initialize the field service for each publisher if it doesn't exist yet.*/
    let count = 0;
    let hasFieldservice;
    for (const publisher of publishers) {
      hasFieldservice = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(
        firstDayReferenceMonthUtc,
        publisher._id,
        publisher.congregationId._id,
      );
      if (hasFieldservice === false) {
        initializedTemplate.publisherId = publisher._id;
        initializedTemplate.pioneerId = publisher.pioneerId;
        initializedTemplate.congregationId = publisher.congregationId._id;
        initializedTemplate.referenceDate = new Date(firstDayReferenceMonthUtc);
        initializedTemplate.deliveryDate = new Date(firstDayReferenceMonthUtc);
        initializedTemplate.referenceYear = firstDayReferenceMonth.getFullYear();
        initializedTemplate.referenceMonth = firstDayReferenceMonth.getMonth() + 1;
        const fieldservice = new FieldService({
          ...initializedTemplate,
        });
        await fieldservice.save();
        //set publisher's status of service
        await Publisher.setPublisherStatusService(publisher._id);
        count++;
      }
    }

    // Get all field service stored in the congregation
    let fieldservice = await FieldService.findByReferenceDateAndCongregationId(firstDayReferenceMonthUtc, congregationId);

    if (fieldservice) {
      message.msg = `${count} field service was initialized!`;
      return res.status(200).send({ message, fieldservice });
    } else {
      message.msg = 'No field service was initialized!';
      return res.status(200).send(message);
    }
  } catch (error) {
    log('error:', error);
    return res.status(400).send(error);
  }
};

module.exports = { initialize };

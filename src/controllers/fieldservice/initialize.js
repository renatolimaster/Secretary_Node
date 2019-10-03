const { message } = require('../../utils/messages');
const moment = require('moment');
let { initializedTemplate } = require('../../models/field-service/initializedModel');
const log = console.log;

const initialize = ({ FieldService, Congregation, Publisher }, { options }) => async (req, res, next) => {
  log('================> FieldService initialize <======================');
  const { congregationId } = req.params;
  const { referenceDate } = req.body;

  const firstDateNow = moment()
    .startOf('month')
    .toDate();
  const firstDateMonth = moment(referenceDate)
    .startOf('month')
    .toDate();
  try {
    if (firstDateMonth >= firstDateNow) {
      message.msg = 'The reference date must be previous to the current date.';
      return res.status(404).send(message);
    }
    const congregation = await Congregation.findById(congregationId);
    if (!congregation) {
      message.msg = 'Congregation not found!';
      return res.status(404).send(message);
    }
    const publishers = await Publisher.findAllByCongregation(congregationId);
    if (!publishers) {
      message.msg = 'There is no publishers linked to congregation';
      return res.status(403).send(message);
    }

    let count = 0;
    let hasFieldservice;
    for (const publisher of publishers) {
      hasFieldservice = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(
        firstDateMonth.toISOString(),
        publisher._id,
        publisher.congregationId._id,
      );
      log(hasFieldservice);
      if (hasFieldservice === false) {
        initializedTemplate.publisherId = publisher._id;
        initializedTemplate.pioneerId = publisher.pioneerId;
        initializedTemplate.congregationId = publisher.congregationId._id;
        initializedTemplate.referenceDate = firstDateMonth;
        initializedTemplate.deliveryDate = firstDateMonth;
        initializedTemplate.referenceYear = firstDateMonth.getFullYear();
        initializedTemplate.referenceMonth = firstDateMonth.getMonth() + 1;
        const fieldservice = new FieldService({
          ...initializedTemplate,
        });
        await fieldservice.save();
        // set publisher's status of service
        await Publisher.setPublisherStatusService(publisher._id);
        count++;
      }
    }

    let fieldservice = await FieldService.findByReferenceDateAndCongregationId(firstDateMonth.toISOString(), congregationId);

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

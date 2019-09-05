const { message } = require('../../utils/messages');
const moment = require('moment');
let { initializedTemplate } = require('../../models/field-service/initializedModel');
const log = console.log;

const initialize = ({ FieldService, Congregation, Publisher }, { options }) => async (req, res, next) => {
  log('================> FieldService initialize <======================');
  const { congregationId } = req.params;
  const { referenceDate } = req.body;
  const date = moment(referenceDate).toDate();
  const firstdate = moment(referenceDate)
    .startOf('month')
    .toDate();
  console.log('firstdate:', firstdate);
  const firstdatePriorMonth = moment(referenceDate)
    .subtract(1, 'months')
    .startOf('month')
    .toDate();
  console.log('firstdatePriorMonth:', firstdatePriorMonth);
  // const date = new Date(referenceDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  log('referenceDate:', referenceDate);
  log('date:', date);
  log('year:', year);
  log('month:', month); // start with 0 to 11
  log('day:', day);
  try {
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
    for (const publisher of publishers) {
      let hasFieldservice = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(
        firstdatePriorMonth.toISOString(),
        publisher._id,
        publisher.congregationId._id,
      );
      if (!hasFieldservice) {
        initializedTemplate.publisherId = publisher._id;
        initializedTemplate.congregationId = publisher.congregationId._id;
        const fieldservice = new FieldService({
          ...initializedTemplate,
        });
        await fieldservice.save();
        count++;
      }
    }

    if (count > 0) {
      message.msg = `${count} field service(s) services have been initialized!`;
    } else {
      message.msg = 'No field service has been initialized!';
    }

    return res.status(200).send(message);
  } catch (error) {
    log('error:', error);
    return res.status(403).send(error);
  }
};

module.exports = { initialize };

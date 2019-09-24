const moment = require('moment');
const _ = require('lodash');
const { message } = require('../../utils/messages');
const { addminutes } = require('../../utils/addminutes');
const log = console.log;
const update = ({ FieldService, Publisher }, { options }) => async (req, res, nex) => {
  log('================> FieldService create <======================');
  let { _id } = req.params;
  let { publisherId, referenceDate, deliveryDate, hours, minutes } = req.body;
  let newHoursActual = hours;
  let newMinutesActual = minutes;
  let congregationId;
  referenceDate = moment(referenceDate).toISOString();
  deliveryDate = moment(deliveryDate).toISOString();
  try {
    if (hours <= 0 || minutes < 15) {
      message.msg = 'Hours need to be more than 0 or minutes need to be at least more than 14!';
      return res.status(403).send(message);
    }
    const fieldService = await FieldService.findById(_id);
    if (!fieldService) {
      message.msg = 'Field service not initialized for the publisher!';
      return res.status(403).send(message);
    }
    const publisher = await Publisher.findById(fieldService.publisherId._id);
    if (!publisher) {
      message.msg = 'Publisher not found!';
      return res.status(403).send(message);
    }
    congregationId = publisher.congregationId._id;
    if (req.user.publishersId.congregationId.toString() !== congregationId.toString()) {
      message.msg = 'Invalid congregation!';
      return res.status(403).send(message);
    }

    /* to take the previous minutes */
    const firstDatePriorMonth = moment(referenceDate)
      .subtract(1, 'months')
      .startOf('month')
      .toDate();
    log('firstDatePriorMonth:', firstDatePriorMonth);
    const previousFieldService = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(firstDatePriorMonth, publisher._id, congregationId);

    if (previousFieldService) {
      const { newhours, newminutes } = await addminutes(hours, fieldService.minutes, previousFieldService.minutes);
      newHoursActual = newhours;
      newMinutesActual = newminutes;
    }

    // map automatically attributes
    _.extend(fieldService, req.body);
    fieldService.hours = newHoursActual;
    fieldService.minutes = newMinutesActual;
    fieldService.referenceDate = referenceDate;
    fieldService.deliveryDate = deliveryDate;
    await fieldService.save();
    return res.status(201).send(fieldService);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { update };

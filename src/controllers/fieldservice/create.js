const moment = require('moment');
const _ = require('lodash');
const { message } = require('../../utils/messages');
const log = console.log;
const create = ({ FieldService, Publisher }, { options }) => async (req, res, nex) => {
  console.log('================> FieldService create <======================');
  let { publisherId, referenceDate, deliveryDate, hours, hoursBetel, minutes } = req.body;
  let congregationId;
  let newHoursActual = hours;
  let newMinutesActual = minutes;
  const firstDatePriorMonth = moment(referenceDate)
    .subtract(1, 'months')
    .startOf('month')
    .toDate();
  const firstDateNow = moment()
    .startOf('month')
    .toDate();
  log('firstDateNow:', firstDateNow);
  referenceDate = moment(referenceDate)
    .startOf('month')
    .toDate();
  deliveryDate = moment(deliveryDate).toDate();
  try {
    // check if publisher exist
    const publisher = await Publisher.findById(publisherId);
    if (!publisher) {
      message.msg = 'Publisher not found!';
      return res.status(403).send(message);
    }
    // check if congregation of publisher is the same logged
    congregationId = publisher.congregationId._id;
    if (req.user.publishersId.congregationId.toString() !== congregationId.toString()) {
      message.msg = 'Invalid congregation!';
      return res.status(403).send(message);
    }
    // check if field service already registered
    const fieldService = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(referenceDate.toISOString(), publisherId, congregationId);
    log('fieldservice 2:', fieldService);
    if (fieldService) {
      message.msg = 'Field service already registered, update it, please!';
      return res.status(403).send(message);
    }
    // check reference date with current date
    if (referenceDate >= firstDateNow) {
      message.msg = 'The reference date must be previous to the current date.';
      return res.status(404).send(message);
    }
    // check delivery date with current date
    if (deliveryDate >= firstDateNow) {
      message.msg = 'The reference date must be previous to the current date.';
      return res.status(404).send(message);
    }
    // check delivery date with reference date
    if (referenceDate > deliveryDate) {
      message.msg = 'The reference date must be previous or equal to the delivery date.';
      return res.status(404).send(message);
    }
    // check if publisher worked at least 15 minutes of month
    if (hours <= 0 || minutes < 15) {
      message.msg = 'Hours need to be more than 0 or minutes need to be at least more than 14!';
      return res.status(403).send(message);
    }
    // check if hour + hour worked for betel is <= 75
    if (publisher.pioneerId.description === 'Regular Pioneer') {
      if (hours + hoursBetel > 75) {
        message.msg = 'Field service hour + betel service hour must be a maximum of 75!';
        return res.status(403).send(message);
      }
    }
    /* to take the previous minutes, if exist */
    log('firstDatePriorMonth:', firstDatePriorMonth);
    const previousFieldService = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(firstDatePriorMonth, publisher._id, congregationId);

    if (previousFieldService) {
      const { newhours, newminutes } = await addminutes(hours, minutes, previousFieldService.minutes);
      newHoursActual = newhours;
      newMinutesActual = newminutes;
    }
    // map automatically attributes
    const fieldservice = new FieldService({ ...req.body });
    // setup the new values
    fieldService.hours = newHoursActual;
    fieldService.minutes = newMinutesActual;
    fieldservice.referenceDate = referenceDate;
    fieldservice.deliveryDate = deliveryDate;
    fieldservice.referenceYear = referenceDate.getFullYear();
    fieldservice.referenceMonth = referenceDate.getMonth() + 1;
    // save field service
    await fieldservice
      .save()
      .then(await Publisher.setPublisherStatusService(publisher._id))
      .then(fieldService =>
        fieldService
          .populate('congregationId', '_id number name')
          .populate('publisherId', '_id fullName statusService')
          .populate('pioneerId', '_id description')
          .execPopulate(),
      );
    // send data back
    return res.status(201).send(fieldservice);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { create };

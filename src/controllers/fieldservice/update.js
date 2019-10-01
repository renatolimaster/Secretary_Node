const moment = require('moment');
const _ = require('lodash');
const { message } = require('../../utils/messages');
const { addminutes } = require('../../utils/addminutes');
const log = console.log;
const update = ({ FieldService, Publisher, Pioneer }, { options }) => async (req, res, nex) => {
  log('================> FieldService create <======================');
  let { _id } = req.params;
  let { publisherId, referenceDate, deliveryDate, hours, hoursBetel, minutes, pioneerId } = req.body;
  let newHoursActual = hours;
  let newMinutesActual = minutes;
  let congregationId;
  const firstDatePriorMonth = moment(referenceDate)
    .subtract(1, 'months')
    .startOf('month')
    .toDate();
  const firstDateNow = moment()
    .startOf('month')
    .toDate();
  referenceDate = moment(referenceDate)
    .startOf('month')
    .toDate();
  deliveryDate = moment(deliveryDate).toDate();
  try {
    // check if field service exist
    let fieldService = await FieldService.findById(_id);
    if (!fieldService) {
      message.msg = 'Field service not create/initialized for the publisher!';
      return res.status(403).send(message);
    }
    // check if publisher exist
    const publisher = await Publisher.findById(publisherId);
    if (!publisher) {
      message.msg = 'Publisher not found!';
      return res.status(403).send(message);
    }
    // check if congregation of publisher is the same of logged
    congregationId = publisher.congregationId._id;
    if (req.user.publishersId.congregationId.toString() !== congregationId.toString()) {
      message.msg = 'Invalid congregation!';
      return res.status(403).send(message);
    }
    // check reference date is the same registered
    log('referenceDate:', referenceDate.toISOString());
    log('fieldService.referenceDate', fieldService.referenceDate.toISOString());
    if (referenceDate.toISOString() !== fieldService.referenceDate.toISOString()) {
      message.msg = 'The reference date can not be changed.';
      return res.status(404).send(message);
    }
    // check delivery date with current date
    if (deliveryDate >= firstDateNow) {
      message.msg = 'The delivery date must be previous to the current date.';
      return res.status(404).send(message);
    }
    // check delivery date with reference date
    if (referenceDate > deliveryDate) {
      message.msg = 'The reference date must be previous to the delivery date.';
      return res.status(404).send(message);
    }
    // check if publisher work at least 15 minutes of month
    if (hours <= 0 && minutes < 15) {
      message.msg = 'Hours need to be more than 0 or minutes need to be at least more than 14!';
      return res.status(403).send(message);
    }

    // check pioneer
    const pioneer = await Pioneer.findById(pioneerId);

    if (pioneer === false) {
      message.msg = 'Pioneer not found!';
      return res.status(404).send(message);
    }

    /* to take the previous field service minutes */
    log('firstDatePriorMonth:', firstDatePriorMonth);
    const previousFieldService = await FieldService.findByReferenceDateAndPublisherIdAndCongregationId(firstDatePriorMonth, publisher._id, congregationId);

    if (previousFieldService) {
      const { newhours, newminutes } = await addminutes(hours, minutes, previousFieldService.minutes);
      newHoursActual = newhours;
      newMinutesActual = newminutes;
    }

    // map automatically attributes
    _.extend(fieldService, req.body);
    fieldService.hours = newHoursActual;
    fieldService.minutes = newMinutesActual;
    fieldService.referenceDate = referenceDate;
    fieldService.deliveryDate = deliveryDate;
    fieldService.referenceYear = referenceDate.getFullYear();
    fieldService.referenceMonth = referenceDate.getMonth() + 1;
    fieldService.pioneerId = pioneer._id;

    await fieldService.save().then(fieldservice => {
      fieldService
        .populate('congregationId', '_id number name')
        .populate('publisherId', '_id fullName statusService')
        .populate('pioneerId', '_id description')
        .execPopulate();
    });

    // set publisher's status of service
    await Publisher.setPublisherStatusService(publisher._id);

    return res.status(201).send(fieldService);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { update };

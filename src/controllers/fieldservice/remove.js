const { message } = require('../../utils/messages');
const { firstDayPriorMonthUtcDate, utcDate } = require('../../utils/firstDayPriorMonthUtc');
const log = console.log;
const remove = ({ FieldService, Publisher }) => async (req, res) => {
  console.log('================= FieldService remove =======================');
  const { _id } = req.params;
  const role = req.user.roleId.role;
  const publisherLogged = req.user.publishersId._id;
  const congregationLogged = req.user.publishersId.congregationId._id;
  let firstDayPriorMonthUtc = await firstDayPriorMonthUtcDate(new Date());
  try {
    // check if field service exist
    let fieldService = await FieldService.findById(_id);
    if (fieldService === false) {
      message.msg = 'Field service not found!';
      return res.status(403).send(message);
    }
    let referenceDateUtc = await utcDate(fieldService.referenceDate);
    let publisherId = fieldService.publisherId._id;

    /* 
    Admin role can remove all field services
    The secretary role can remove only field services belonging to his congregation.
    Other roles can remove only his own current field services 
    */
    if (role !== 'Admin' && role !== 'Secretary') {
      if (publisherLogged.toString() !== publisherId.toString()) {
        message.msg = 'The field service does not belong to the logged-in user.';
        return res.status(403).send(message);
      }
      if (firstDayPriorMonthUtc > referenceDateUtc) {
        message.msg = 'Only the administrator or secretary can remove previous field services.';
        return res.status(403).send(message);
      }
    } else if (role === 'Secretary') {
      if (congregationLogged.toString() !== fieldService.congregationId._id.toString()) {
        message.msg = 'The field service does not belong to your congregation.';
        return res.status(400).send(message);
      }
    }

    await fieldService.remove({ _id }).then(await Publisher.setPublisherStatusService(publisherId));

    return res.status(200).send(fieldService);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { remove };

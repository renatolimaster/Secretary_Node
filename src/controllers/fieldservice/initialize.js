const { message } = require('../../utils/messages');
const moment = require('moment');
const log = console.log;
const initialize = ({ FieldService, Congregation, Publisher }, { options }) => async (req, res, next) => {
  log('================> FieldService initialize <======================');
  const { congregationId } = req.params;
  const { referenceDate } = req.body;
  const date = moment(referenceDate, 'YYYY-MM-DD').toDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
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

    return res.status(200).send(publishers);
  } catch (error) {
    return res.status(403).send(error);
  }
};

module.exports = { initialize };

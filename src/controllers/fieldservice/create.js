const log = console.log;
const { message } = require('../../utils/messages');
const create = ({ FieldService, Publisher }, { options }) => async (req, res, nex) => {
  console.log('================> FieldService create <======================');
  const { publisherId } = req.body;
  log(publisherId);
  try {
    const publisher = await Publisher.findById(publisherId);
    if (!publisher) {
      message.msg = 'Publisher not found!';
      return res.status(403).send(message);
    }
    return res.status(201).send(publisher);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { create };

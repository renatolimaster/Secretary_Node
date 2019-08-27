const mongoose = require('mongoose');
const idValidate = require('../../utils/idValidate');
const log = console.log;
const byid = ({ Circuit }, { options }) => async (req, res, next) => {
  log('=============> Circuit byid <===================');
  const { _id } = req.params;
  const idIsValid = await idValidate(_id);
  try {
    if (!idIsValid) {
      return res.status(403).send('Invalid id!');
    }
    const circuit = await Circuit.findById(_id);
    if (!circuit) {
      return res.status(403).send('Circuit not found!');
    }
    log('_id:', _id);
    return res.status(201).send(circuit);
  } catch (error) {
    log('error:', error);
    return res.status(400).send(error);
  }
};

module.exports = { byid };

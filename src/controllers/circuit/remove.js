const idValidate = require('../../utils/idValidate');
const remove = ({ Circuit, Congregation }, { config }) => async (req, res, next) => {
  console.log('================= Circuit remove =======================');
  let message = { msg: '' };
  const { _id } = req.params;
  const idIsValid = await idValidate(_id);
  if (!idIsValid) {
    return res.status(403).send('Invalid id!');
  }
  //
  try {
    const congregation = await Congregation.findByCircuit(_id);
    log('congregation 2:', congregation);
    if (congregation) {
      message.msg = 'There is congregation linked to the circuit!';
      return res.status(403).send(message);
    }
    const circuit = await Circuit.findById(_id);
    if (!circuit) {
      message.msg = 'Circuit not found!';
      return res.status(403).send(message);
    }
    await circuit.remove({ _id });
    return res.status(201).send(circuit);
  } catch (error) {
    return res.status(403).send(error);
  }
};

module.exports = { remove };

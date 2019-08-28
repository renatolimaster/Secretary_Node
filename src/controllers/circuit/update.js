const _ = require('lodash');
const log = console.log;

const update = ({ Circuit }, { options }) => async (req, res, next) => {
  log('=============> Congregation Update <===================');
  let message = { msg: '' };
  const { _id } = req.params;
  const { identification, notes, officeId, overseerId } = req.body;
  // extract only key of body
  const updates = Object.keys(req.body);
  // only attributes declared in allowedUpdates below are permitted to be updated
  const allowedUpdates = ['identification', 'notes', 'officeId', 'overseerId'];
  // to check if attributes are permitted
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    message.msg = 'Invalid attributes to update!';
    return res.status(400).send(message);
  }

  try {
    const hasOverseerOtherCircuit = await Circuit.findOverseerIdInOtherCircuit(_id, overseerId);
    if (hasOverseerOtherCircuit) {
      message.msg = `The Circuit Overseer belongs to circuit "${hasOverseerOtherCircuit.identification}". Release it first.`;
      return res.status(403).send(message);
    }
    let circuit = await Circuit.findById(_id);
    if (!circuit) {
      message.msg = 'Circuit not found!';
      return res.status(403).send(message);
    }
    _.extend(circuit, req.body);
    circuit.modifiedBy = req.user.publishersId;
    // OR
    // updates.forEach(update => {
    //   circuit[update] = req.body[update];
    // });

    /* necessary to repopulate circuit */
    await circuit.save().then(circuit =>
      circuit
        .populate('officeId')
        .populate('overseerId')
        .populate('congregations')
        .execPopulate(),
    );
    return res.status(201).send(circuit);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { update };

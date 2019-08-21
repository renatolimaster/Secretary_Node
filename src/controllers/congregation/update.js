const _ = require('lodash');
const log = console.log;
/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const update = ({ Congregation }) => async (req, res) => {
  log('=============> Congregation Update <===================');
  const { _id } = req.params;
  const { number, name } = req.body;
  // extract only key of body
  const updates = Object.keys(req.body);
  // only attributes declared in allowedUpdates below are permitted to be updated
  const allowedUpdates = ['number', 'name', 'modifiedBy', 'address', 'phones', 'email', 'coordinatorId', 'default', 'circuitId'];
  // to check if attributes are permitted
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid attributes to update!' });
  }

  // verify if exist the same name and number of congregation with different id
  const hasCongregation = await Congregation.findOne({ _id: { $ne: _id }, number, name });

  if (hasCongregation) {
    return res.status(403).send('There is a congregation with the same number and name registered!');
  }

  try {
    const congregation = await Congregation.findById({ _id }).populate('circuitId');
    // to audit who is modifying the document
    if (!congregation) {
      return res.status(400).send({ error: 'Congregation not found!' });
    }
    // map automatically attributes
    _.extend(congregation, req.body);
    // OR
    // updates.forEach(update => {
    //   user[update] = req.body[update];
    // });
    await congregation.save();
    log('congregation', congregation);
    return res.status(200).send({ congregation });
  } catch (e) {
    console.error(`Failed to find document: ${e}`);
    return res.status(403).send(`Failed to find document: ${e}`);
  }
};

module.exports = { update };

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
  // extract only key of body
  const updates = Object.keys(req.body);
  // only attributes declared in allowedUpdates below are permitted to be updated
  const allowedUpdates = ['number', 'name', 'modifiedBy', 'address', 'phones', 'email', 'coordinatorId', 'default'];
  // to check if attributes are permitted
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid attributes to update!' });
  }

  try {
    console.log('id 1:', _id);
    const congregation = await Congregation.findById({ _id });
    // to audit who is modifying the document
    if (!congregation) {
      console.log('congregation:', congregation);
      return res.status(400).send({ error: 'Congregation not found!' });
    }
    // map automatically attributes
    _.extend(congregation, req.body);
    // OR
    // updates.forEach(update => {
    //   user[update] = req.body[update];
    // });
    console.log('id 2:', req.user._id);
    
    await congregation.save();
    res.status(200).send({ congregation });
  } catch (e) {
    console.error(`Failed to find document: ${e}`);
    res.status(403).send(`Failed to find document: ${e}`);
  }
};

module.exports = { update };

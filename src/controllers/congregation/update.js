const _ = require('lodash');
const log = console.log;
/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const update = ({ Congregation }, { config }) => async (req, res, next) => {
  log('=============> Congregation Update <===================');
  const { _id } = req.params;
  console.log('req.user.publishersId:', req.user);
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
  console.log('req.user.publishersId:', req.user.publishersId);
  try {
    const congregation = await Congregation.findOne({ _id });
    // map automatically attributes
    console.log(req.body);
    _.extend(congregation, req.body);
    // to audit who is modifying the document
    congregation.modifiedBy = req.user;
    // save asynchronous
    await congregation.save();
    res.status(200).send({ congregation });
  } catch (error) {
    console.error(`Failed to find document: ${error}`);
    res.status(403).send(`Failed to find document: ${error}`);
  }
};

module.exports = { update };

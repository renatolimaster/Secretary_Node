const _ = require('lodash');
const log = console.log;

const update = ({ Role }) => async (req, res, next) => {
  log('=============> Role Update <===================');

  if (req.body.model === undefined) {
    return res.status(400).send('You must to inform at least one model.');
  }
  if (req.body.model.length === 0) {
    return res.status(400).send('You must to inform at least one model.');
  }
  if (req.body.model[0].action === undefined) {
    return res.status(400).send('You must to inform at least one action.');
  }
  if (req.body.model[0].action.length === 0) {
    return res.status(400).send('You must to inform at least one action.');
  }

  const { _id } = req.params;
  // extract only key of body
  const updates = Object.keys(req.body);
  // only attributes declared in allowedUpdates below are permitted to be updated
  const allowedUpdates = ['role', 'model', 'action'];
  // to check if attributes are permitted
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid attributes to update!' });
  }

  const role = await Role.findById({ _id })
    .then(result => {
      if (!result) {
        return res.status(400).send({ error: 'Role not found!' });
      }
      // map automatically attributes
      _.extend(result, req.body);
      result.save();
      return res.status(200).send({ result });
    })
    .catch(e => {
      return res.status(403).send(`Failed to find document: ${e}`);
    });
};

module.exports = { update };

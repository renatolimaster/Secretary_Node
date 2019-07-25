const _ = require('lodash');
const log = console.log;

const update = ({ Role }) => async (req, res, next) => {
  log('=============> Role Update <===================');
  log(req.body);
  const { _id } = req.params;
  // extract only key of body
  const updates = Object.keys(req.body);
  // only attributes declared in allowedUpdates below are permitted to be updated
  const allowedUpdates = ['role', 'model'];
  // to check if attributes are permitted
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid attributes to update!' });
  }

  return res.status(200).send('Ok');
};

module.exports = { update };

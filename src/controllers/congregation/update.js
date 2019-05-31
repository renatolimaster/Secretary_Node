const _ = require('lodash');

const update = ({ Congregation }, { config }) => async (req, res, next) => {
  console.log('=============> Congregation Update <===================');
  const { _id } = req.params;
  // extract only key of body
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'id',
    'name',
    'modifiedBy',
    'address',
    'phones',
    'email',
    'coordenatorId',
    'default'
  ];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const congregation = await Congregation.findOne({ _id });
    _.extend(congregation, req.body);
    // to audit who is modifying the document
    congregation.modifiedBy = req.user.publishersId;
    await congregation.save();
    res.status(200).send({ congregation });
  } catch (error) {
    next(error);
  }
};

module.exports = { update };

const _ = require('lodash');

const update = ({ Congregacao }, { config }) => async (req, res, next) => {
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
    const congregacao = await Congregacao.findOne({ _id });
    _.extend(congregacao, req.body);
    // to audit who is modifying the document
    congregacao.modifiedBy = req.user.publishersId;
    await congregacao.save();
    res.status(200).send({ congregacao });
  } catch (error) {
    next(error);
  }
};

module.exports = { update };

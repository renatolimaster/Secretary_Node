const _ = require('lodash');

/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const remove = ({ Congregation, Publisher }, { config }) => async (req, res, next) => {
  console.log('================= Congregation remove =======================');
  let message = { msg: '' };
  const { _id } = req.params;
  const hasPublishers = await Publisher.findByCongregation(_id);
  if (hasPublishers) {
    message.msg = 'There are publishers linked to this congregation!';
    return res.status(403).send(message);
  }
  try {
    const congregation = await Congregation.findOne({ _id });
    await congregation.remove({ _id });
    res.status(200).send({ congregation });
  } catch (error) {
    next(error);
  }
};

module.exports = { remove };

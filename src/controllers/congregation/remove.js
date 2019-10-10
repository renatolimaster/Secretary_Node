const _ = require('lodash');

/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const remove = ({ Congregation, Publisher }, { config }) => async (req, res) => {
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
    if (!congregation) {
      message.msg = 'Congregation not found!';
      return res.status(403).send(message);
    }
    await congregation.remove({ _id });
    return res.status(200).send({ congregation });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { remove };

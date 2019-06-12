const _ = require('lodash');

/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const remove = ({ Congregation }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const congregation = await Congregation.findOne({ _id });
    await congregation.remove({ _id });
    res.status(200).send({ congregation });
  } catch (error) {
    next(error);
  }
};

module.exports = { remove };

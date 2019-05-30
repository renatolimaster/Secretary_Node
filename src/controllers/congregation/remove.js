const _ = require('lodash');

const remove = ({ Congregacao }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const congregacao = await Congregacao.findOne({ _id });
    await congregacao.remove({ _id });
    res.status(200).send({ congregacao });
  } catch (error) {
    next(error);
  }
};

module.exports = { remove };

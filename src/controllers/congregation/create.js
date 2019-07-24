/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const create = ({ Congregation }, { config }) => async (req, res, next) => {
  console.log('================> Congregation create <======================');
  console.log('================> body: ', req.body);
  const { _id } = req.params;

  try {
    const congregation = new Congregation({
      ...req.body,
    });
    congregation.modifiedBy = req.user.publishersId;
    await congregation.save();
    res.status(201).send(congregation);
  } catch (error) {
    console.log('error:', error);
    res.status(400).send(error);
  }
};

module.exports = { create };

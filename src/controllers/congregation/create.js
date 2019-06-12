/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const create = ({ Congregation }, { config }) => async (req, res, next) => {
  console.log('================> Congregation create <======================');
  console.log('================> body: ', req.body);
  try {
    const congregation = new Congregation({
      ...req.body
    });
    await congregation.save();
    res.status(201).send(congregation);
  } catch (error) {
    res.status(400).send(error);
    // next(new Error(error)); // to use middleware errorHandler.js
  }
};

module.exports = { create };

const create = ({ Congregacao }, { config }) => async (req, res, next) => {
  console.log('================> Congregation create <======================');
  console.log('================> body: ', req.body);
  try {
    const congregacao = new Congregacao({
      ...req.body
    });
    await congregacao.save();
    res.status(201).send(congregacao);
  } catch (error) {
    res.status(400).send(error);
    // next(new Error(error)); // to use middleware errorHandler.js
  }
};

module.exports = { create };

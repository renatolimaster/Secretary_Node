const create = ({ Publicador }, { config }) => async (req, res, next) => {
  console.log('================> Publicador create <======================');
  console.log(req.body);
  try {
    const publicador = new Publicador({
      ...req.body
    });
    await publicador.save();
    res.status(201).send(publicador);
  } catch (error) {
    // res.status(400).send(error);
    next(new Error(error)); // to use middleware errorHandler.js
  }
};

module.exports = { create };

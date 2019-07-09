const create = ({ Publisher }, { config }) => async (req, res, next) => {
  console.log('================> Publisher create <======================');
  console.log(req.body);
  try {
    const publisher = new Publisher({
      ...req.body,
    });
    await publisher.save();
    res.status(201).send(publisher);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    // next(new Error(error)); // to use middleware errorHandler.js
  }
};

module.exports = { create };

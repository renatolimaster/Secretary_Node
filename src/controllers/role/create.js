const create = ({ Role }, { config }) => async (req, res, next) => {
  console.log('================> Role create <======================');
  console.log(req.body);
  try {
    const role = new Role({
      ...req.body,
    });
    await role.save();
    res.status(201).send(role);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    // next(new Error(error)); // to use middleware errorHandler.js
  }
};

module.exports = { create };

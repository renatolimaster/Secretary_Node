const log = console.log;
const create = ({ Office }, { config }) => async (req, res, next) => {
  console.log('================> Office create <======================');
  const { type, address, phones, email } = req.body;
  log(type, address, phones, email);
  try {
    const office = new Office({
      ...req.body,
    });
    office.modifiedBy = req.user.publishersId;
    await office.save();
    return res.status(201).send(office);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { create };

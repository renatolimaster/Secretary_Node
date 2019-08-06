const create = ({ Publisher }, { config }) => async (req, res, next) => {
  console.log('================> Publisher create <======================');
  const { firstName, middleName, lastName, congregationId } = req.body;
  let hasPublisher;
  await Publisher.findDuplicate({ firstName, middleName, lastName, congregationId })
    .then(result => {
      hasPublisher = result;
    })
    .catch(error => {
      console.log('error:', error);
      return res.status(400).send(error);
    });

  if (hasPublisher) {
    return res.status(400).send(`There is publisher in that congregation with same first name, middle name and last name registered.`);
  }

  try {
    const publisher = new Publisher({
      ...req.body,
    });
    await publisher.save();
    res.status(201).send(publisher);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { create };

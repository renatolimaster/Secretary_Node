const create = ({ Publisher, User, Congregation }, { config }) => async (req, res, next) => {
  console.log('================> Publisher create <======================');
  const { firstName, middleName, lastName, congregationId, userId } = req.body;
  let hasPublisher;
  let bindingCode;

  /*  Checks if the congregation exist */
  const congregation = await Congregation.findById({ _id: congregationId });

  if (!congregation) {
    return res.status(400).send('The congregation informed was not found!');
  }

  /* Checks if the informed user exists. */
  const user = await User.findById({ _id: userId });

  if (!user) {
    return res.status(403).send('This informed user was not found!');
  } else {
    /* Checks if the user is linked to another publisher */
    bindingCode = user.bindingCode;
    await User.findByBindingCode(bindingCode)
      .then(result => {
        hasPublisher = result;
      })
      .catch(error => {
        console.log('error:', error);
        return res.status(400).send(error);
      });
    if (hasPublisher) {
      return res.status(400).send('That user informed is already linked with another publisher!');
    }
  }

  /*  Checks if there is the same publisher name in the same congregation */
  await Publisher.findDuplicate({ firstName, middleName, lastName, congregationId })
    .then(result => {
      hasPublisher = result;
    })
    .catch(error => {
      console.log('error:', error);
      return res.status(400).send(error);
    });

  if (hasPublisher) {
    return res.status(400).send('There is a registered publisher in this congregation with the same name, middle name, and last name.');
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

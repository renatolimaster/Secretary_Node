const release = ({ Publisher }, { config }) => async (req, res, next) => {
  console.log('================> Publisher release <======================');
  const { _id, congregationId } = req.params;
  console.log('params:', _id, congregationId);
  try {
    const publisher = await Publisher.findByIdAndCongregation(_id, congregationId);
    if (!publisher) {
      return res.status(403).send('This publisher is not linked to this congregation!');
    }
    publisher.congregationId = null;
    await publisher.save();
    return res.status(201).send(publisher);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = { release };

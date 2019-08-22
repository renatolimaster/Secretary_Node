const remove = ({ Office, Circuit }, { options }) => async (req, res, next) => {
  console.log('================= Office remove =======================');
  const { _id } = req.params;
  let message = { msg: '' };
  try {
    const hasCircuit = await Circuit.findByOfficeId(_id);
    console.log(hasCircuit);
    if (hasCircuit) {
      message.msg = 'Removal not allowed. There is circuit belonging to this office!';
      return res.status(403).send(message);
    }
    const office = await Office.findById(_id);
    await office.remove(_id);
    return res.status(201).send(office);
  } catch (error) {
    return req.status(400).send(error);
  }
};

module.exports = { remove };

const idValidate = require('../../utils/idValidate');

const byid = ({ Publisher }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  let message = { msg: '' };
  const idIsValid = await idValidate(_id);
  if (!idIsValid) {
    return res.status(403).send('Invalid id!');
  }

  console.log(req.user);
  try {
    const publisher = await Publisher.findById(_id);
    if (!publisher) {
      message.msg = 'No document matches the provided query.';
      return res.status(403).send(message);
    }
    return res.status(201).send(publisher);
  } catch (error) {
    return res.status(403).send(error);
  }
};

module.exports = { byid };

const auth = require('../../middleware/auth');
const create = ({ User }, { config }) => async (req, res) => {
  try {
    const user = new User({
      ...req.body
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).send(error);
  }
};

module.exports = { create };

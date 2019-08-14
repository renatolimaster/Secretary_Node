const auth = require('../../middleware/auth');

const create = ({ User }, { config }) => async (req, res) => {
  console.log('=============> Create User <=============');
  const { username, email } = req.body;
  let message = { msg: '' };

  /* Checks if username exist */
  const findUsername = await User.findByUsername(username);

  if (findUsername) {
    message.msg = `The username  "${username}" already exist!`;
    return res.status(403).send(message);
  }

  /* Checks if email exist */
  const findEmail = await User.findByEmail(email);

  if (findEmail) {
    message.msg = `The e-mail  "${email}" already exist!`;
    return res.status(403).send(message);
  }

  try {
    const user = new User({
      ...req.body,
    });

    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).send({
      user,
      token,
    });
  } catch (error) {
    console.log('error: ', error);
    return res.status(400).send(error);
  }
};

module.exports = {
  create,
};

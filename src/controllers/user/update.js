const bcrypt = require('bcryptjs');
const update = ({ User }) => async (req, res) => {
  console.log('=============> update USER <===================');
  const { _id } = req.params;
  const { username, email, password } = req.body;
  let message = { msg: '' };
  // extract only key of body
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'firstName', 'middleName', 'lastName', 'password', 'confirmPassword', 'roleId', 'publishersId'];

  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  /* Checks if username exist */
  const findByIdAndUsername = await User.findByIdAndUsername(_id, username);

  if (findByIdAndUsername) {
    message.msg = `The username  "${username}" already exist!`;
    return res.status(403).send(message);
  }

  /* Checks if email exist */
  const findByIdAndEmail = await User.findByIdAndEmail(_id, email);

  if (findByIdAndEmail) {
    message.msg = `The e-mail  "${email}" already exist!`;
    return res.status(403).send(message);
  }
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).send({ error: 'User not found!' });
    }
    /* Checks if password given is the same stored in DB. if it is true password can not be encrypt again */
    await bcrypt.compare(password, user.password).then(res => {
      if (!res) {
        user.password = password;
      }
    });
    updates.forEach(update => {
      /* its because was checked before */
      if (update !== 'password') {
        user[update] = req.body[update];
      }
    });

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { update };

const update = ({ User }, { config }) => async (req, res) => {
  console.log('=============> update USER <===================');
  // extract only key of body
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'privilege', 'password', 'confirmPassword', 'publishersId'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(400).send({ error: 'User not found!' });
    }
    // to update each attribute given
    // we can use lodash package too
    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { update };

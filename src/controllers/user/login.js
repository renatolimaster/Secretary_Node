const login = ({ User }, { config }) => async (req, res) => {
  console.log('=================> login <=================');
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send('Unable to login.');
  }
};

module.exports = { login };

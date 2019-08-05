const logout = ({ User }, { config }) => async (req, res) => {
  console.log('=================> logout <=================');
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send('The user was log out!');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { logout };

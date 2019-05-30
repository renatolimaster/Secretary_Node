const logout = ({ User }, { config }) => async (req, res) => {
  console.log('=================> logout <=================');
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { logout };

const logoutAll = ({ User }, { config }) => async (req, res) => {
  console.log('=================> logoutAll <=================');
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { logoutAll };

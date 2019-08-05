const logoutall = ({ User }, { config }) => async (req, res) => {
  console.log('=================> logoutAll <=================');
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send('The user was log out of all devices!');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { logoutall };

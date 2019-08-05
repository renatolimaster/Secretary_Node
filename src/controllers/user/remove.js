const remove = ({ User }, { config }) => async (req, res, next) => {
  console.log('============== Remove User ======================');
  const { _id } = req.params;
  let roleId = req.user._id;
  try {
    if (roleId.toString() === _id.toString()) {
      console.log("You can't remove your own user!");
      return res.status(400).send("You can't remove your own user!");
    }
    const user = await User.findById({ _id });

    if (!user) {
      return res.status(400).send('User not found!');
    }
    user.remove({ _id });
    return res.status(201).send(user);
  } catch (error) {
    console.log('error:', error);
    return res.status(400).send(error);
  }
};

module.exports = { remove };

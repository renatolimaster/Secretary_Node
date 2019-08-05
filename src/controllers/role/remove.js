/**
 * @param {*} { Role }
 * @param {*} { config }
 */
const remove = ({ Role, User }, { config }) => async (req, res, next) => {
  console.log('================= Role remove =====================');
  const { _id } = req.params;

  try {
    let role = await Role.findById({ _id }).populate('users');

    if (role === null) {
      return res.status(404).send('That role was not found!');
    }
    if (role.role === 'Admin') {
      return res.status(403).send('That role cannot be removed!');
    }

    console.log('role user:', role.users[0]);

    if (role.users[0]) {
      return res.status(403).send('That role cannot be removed! There are users associated with it!');
    }
    role.remove({ _id });
    console.log('here after remove', _id);
    return res.status(200).send({ role });
  } catch (error) {
    console.log('error:', error);
    return res.status(400).send(error);
  }
};

module.exports = { remove };

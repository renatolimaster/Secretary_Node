/**
 * @param {*} { Role }
 * @param {*} { config }
 */
const remove = ({ Role }, { config }) => async (req, res, next) => {
  const { _id } = req.params;

  await Role.findById({ _id })
    .then(role => {
      if (role === null) {
        return res.status(404).send('The role was not found!');
      } else {
        if (role.role === 'Admin') {
          return res.status(403).send('That role cannot be removed!');
        }
        // role.remove({ _id });
        console.log(_id);
        return res.status(200).send({ role });
      }
    })
    .catch(e => {
      return res.status(400).send(error);
    });
};

module.exports = { remove };

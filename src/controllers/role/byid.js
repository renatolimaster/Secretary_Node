const { message } = require('../../utils/messages');
const log = console.log;
const byid = ({ Role }) => async (req, res) => {
  log('=================== Role byid ======================');
  const { _id } = req.params;
  log('_id:', _id);
  //
  let query = {};
  let options = {}; // limit clause return only first attribute

  /*  admin can access any congregation otherwise only its own */
  console.log('user:', req.user.roleId.role);
  if (req.user.roleId.role === 'Admin') {
    console.log('1:', req.user.roleId.role);
    query = { _id: _id };
  } else {
    console.log('2:', req.user.roleId.role);
    query = { _id: req.user.publishersId.congregationId };
  }
  console.log('query:', query);

  const role = await Role.findOne(query)
    .populate('user', 'username firstName lastName')
    .then(result => {
      log('result:', result);
      if (result) {
        return res.status(201).send(result);
      } else {
        message.msg = 'The role was not found!';
        return res.status(404).send(message);
      }
    })
    .catch(error => {
      return res.status(403).send(error);
    });
};

module.exports = { byid };

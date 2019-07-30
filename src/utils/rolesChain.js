const mongoose = require('mongoose');
const { Role } = require('../models/role');

const roles = async function(req, res, next) {
  console.log(mongoose.connection.readyState);

  let role = req.user.roleId.role;
  let model = req.originalUrl.split('/')[3].toString();
  let action = req.url
    .match('^[^?]*')[0]
    .split('/')
    .slice(1)[0]
    .toString();

  console.log('role:', role);
  console.log('model:', model);
  console.log('action:', action);
  console.log('id:', req.user._id);
  // console.log('congregationId:', req.user.publishersId.congregationId);

  const query = {
    // user: req.user._id,
    role: role,
    model: { $elemMatch: { name: model, action: action } },
  };
  console.log('query role:', query);

  const roles = await Role.findOne(query)
    .then(result => {
      console.log('roles:', result);
      if (result === null) {
        console.log(`Unauthorized to ${action} for ${model}`);
        res.status(403).send(`Unauthorized to ${role} to ${action} for ${model}`);
      } else {
        next(); // must appear in only one place
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

module.exports = roles;

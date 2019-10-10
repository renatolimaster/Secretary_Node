const mongoose = require('mongoose');
const { Role } = require('../models/role');
const { message } = require('../utils/messages');

const roles = async function(req, res, next) {
  if (req.user.roleId === null) {
    return res.status(403).send(`There is no role associated with your user!`);
  }
  let role = req.user.roleId.role;
  let model = req.originalUrl.split('/')[3].toString();
  let action = req.url
    .match('^[^?]*')[0]
    .split('/')
    .slice(1)[0]
    .toString();

  if (req.user.publishersId === undefined || req.user.publishersId === null) {
    message.msg = 'User has no linked publisher!';
    return res.status(403).send(message);
  }

  if (req.user.publishersId.congregationId === undefined || req.user.publishersId.congregationId === null) {
    message.msg = 'Congregation not found for user!';
    return res.status(403).send(message);
  }

  console.log('role:', role);
  console.log('model:', model);
  console.log('action:', action);
  console.log('id:', req.user._id);
  console.log('congregationId:', req.user.publishersId.congregationId);

  const query = {
    role: role,
    model: { $elemMatch: { name: model, action: action } },
  };
  console.log('query role:', query);

  const roles = await Role.findOne(query)
    .then(result => {
      console.log('roles:', result);
      if (result === null) {
        console.log(`The role unauthorized to ${action} the ${model}`);
        message.msg = `The role unauthorized to ${action} the ${model}`;
        return res.status(403).send(message);
      } else {
        next(); // must appear in only one place
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

module.exports = roles;

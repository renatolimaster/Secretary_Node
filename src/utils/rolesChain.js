const mongoose = require('mongoose');
const { Role } = require('../models/role');

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
        console.log(`Role unauthorized to ${action} for ${model}`);
        return res.status(403).send(`The role unauthorized to ${action} the ${model}`);
      } else {
        next(); // must appear in only one place
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

module.exports = roles;

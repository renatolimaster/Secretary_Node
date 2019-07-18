const mongoose = require('mongoose');
const { Role } = require('../models/role');

const roles = async function(req, res, next) {
  console.log(mongoose.connection.readyState);

  let privilege = req.user.privilege;
  let model = req.originalUrl.split('/')[3].toString();
  let action = req.url
    .match('^[^?]*')[0]
    .split('/')
    .slice(1)[0]
    .toString();

  console.log('privilege:', privilege);
  console.log('model:', model);
  console.log('action:', action);

  console.log('id:', req.user._id);

  const options = {
    user: req.user._id,
    role: privilege,
    'model.name': {
      $in: model,
    },
    'model.action': {
      $in: action,
    },
  };

  // const roles = await Role.findOne(options);

  // if (roles === null) {
  //   console.log(`Unauthorized to ${action} for ${model}`);
  //   res.status(403).send(`Unauthorized to ${action} for ${model}`);
  // } else {
  //   next();
  // }
  next();
};

module.exports = roles;

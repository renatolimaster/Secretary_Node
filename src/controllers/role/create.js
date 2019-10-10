const _ = require('lodash');
const { message } = require('../../utils/messages');
const create = ({ Role }, { config }) => async (req, res, next) => {
  console.log('================> Role create <======================');

  let role, newRole, query;

  if (req.body.model === undefined) {
    return res.status(400).send('You must to inform at least one model.');
  }
  if (req.body.model.length === 0) {
    return res.status(400).send('You must to inform at least one model.');
  }
  if (req.body.model[0].action === undefined) {
    return res.status(400).send('You must to inform at least one action.');
  }
  if (req.body.model[0].action.length === 0) {
    return res.status(400).send('You must to inform at least one action.');
  }

  role = req.body.role;

  query = {
    role: role,
  };
  await Role.findOne(query)
    .then(result => {
      if (result !== null) {
        message.msg = `The role "${role}" already exist!`;
        return res.status(409).send(message);
      } else {
        newRole = new Role({
          ...req.body,
        });
        newRole.save();
        return res.status(201).send(newRole);
      }
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

module.exports = { create };

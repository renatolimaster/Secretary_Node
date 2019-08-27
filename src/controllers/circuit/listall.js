const { circuitProjectionsFull } = require('./projections');
const { congregationProjectionBasic } = require('../congregation/projections');
const { paginates } = require('../../utils/paginate');
const listall = ({ Circuit, Congregation }, { config }) => async (req, res, next) => {
  log('=============> Circuit listall <===================');
  const publishersId = req.user.publishersId;
  const message = { msg: '' };
  if (publishersId === undefined) {
    message.msg = 'User has no linked publisher!';
    return res.status(403).send(message);
  }
  const congregationId = req.user.publishersId.congregationId;
  if (congregationId === undefined) {
    message.msg = 'Congregation not found for user!';
    return res.status(403).send(message);
  }
  //
  let query = {};
  let options = {}; // limit clause return only first attribute
  /*  admin can access any office otherwise only its own if authorized */
  const congregation = await Congregation.findById({ _id: congregationId });
  const circuit = await Circuit.findById({ _id: congregation.circuitId });
  if (req.user.roleId.role.toString() !== 'Admin') {
    query = { _id: circuit._id };
  }

  options = {
    select: circuitProjectionsFull,
    sort: { name: -1 },
    populate: [{ path: 'congregations', select: congregationProjectionBasic }, { path: 'officeId' }],
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Circuit, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }
};

module.exports = { listall };
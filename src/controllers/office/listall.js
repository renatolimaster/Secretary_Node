const { officeProjectionsFull } = require('./projections');
const { circuitProjectionsBasic } = require('../circuit/projections');
const { paginates } = require('../../utils/paginate');
const log = console.log;
const listall = ({ Office, Congregation, Circuit }, { config }) => async (req, res, next) => {
  log('=============> Office listall <===================');
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
    query = { _id: circuit.officeId._id };
  }

  options = {
    select: officeProjectionsFull,
    sort: { name: -1 },
    populate: [{ path: 'circuits', select: circuitProjectionsBasic }, { path: 'officeId' }],
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Office, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }

  /* 
  Office.paginate(query, options)
    .then(results => {
      log(query);
      log('response:', results);
      if (results) {
        //  console.log(`Successfully found document: ${results}.`);
        res.status(200).send(results);
      } else {
        // console.log('No document matches the provided query.');
        res.status(403).send('No document matches the provided query.');
      }
    })
    .catch(error => {
      console.error(`Failed to find document: ${error}`);
      res.status(403).send(`Failed to find document: ${error}`);
    });
 */
};

module.exports = { listall };

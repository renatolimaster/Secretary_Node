const { userProjectionFull } = require('./projections');
const { publisherProjectionBasic } = require('../../models/publisher/projections');
const { roleProjectionFull } = require('../role/projections');
const log = console.log;
const listall = ({ User }, { config }) => async (req, res, next) => {
  log('====================== User listall =====================');

  //
  let query = {};
  let options = {
    select: userProjectionFull,
    sort: { name: -1 },
    populate: [{ path: 'publishersId', select: publisherProjectionBasic }, { path: 'roleId', select: roleProjectionFull }],
    lean: true,
    page: 1,
    limit: 10,
  }; // limit clause return only first attribute
  /*  admin can access any congregation otherwise only its own if authorized*/
  if (req.user.roleId.role.toString() !== 'Admin') {
    query = { _id: req.user._id };
  }
  console.log('query:', query);
  //
  User.paginate(query, options)
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
};

module.exports = { listall };

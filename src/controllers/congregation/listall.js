const { congregationProjectionFull } = require('../../models/congregation/projections');
const { publisherProjectionBasic } = require('../../models/publisher/projections');
const { paginates } = require('../../utils/paginate');
var ObjectId = require('mongoose').Types.ObjectId;
const log = console.log;
/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const listall = ({ Congregation }, { config }) => async (req, res, next) => {
  log('=============> Congregation getAll <===================');
  log('user:', req.user);
  //
  let query = {};
  let options = {}; // limit clause return only first attribute
  /*  admin can access any congregation otherwise only its own if authorized */
  if (req.user.roleId.role.toString() !== 'Admin') {
    query = { _id: req.user.publishersId.congregationId };
  }
  log('query:', query);
  //
  /* return await Congregation.find(query, options)
    .sort({ name: 1 })
    .then(results => {
      if (results) {
        console.log(`Successfully found document: ${results}.`);
        res.status(200).send(results);
      } else {
        console.log('No document matches the provided query.');
        res.status(403).send('No document matches the provided query.');
      }
      return results;
    })
    .catch(err => console.error(`Failed to find document: ${err}`)); */
  options = {
    select: congregationProjectionFull,
    sort: { name: -1 },
    populate: [{ path: 'publishers', select: publisherProjectionBasic }, { path: 'officeId' }],
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Congregation, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }
  /* 
  Congregation.paginate(query, options)
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
    }); */
};

module.exports = { listall };

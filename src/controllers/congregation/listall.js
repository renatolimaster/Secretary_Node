var ObjectId = require('mongoose').Types.ObjectId;
/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const listall = ({ Congregation }, { config }) => async (req, res, next) => {
  console.log('=============> Congregation getAll <===================');
  console.log('user:', req.user);
  //
  let query = {};
  let options = {}; // limit clause return only first attribute
  /*  admin can access any congregation otherwise only its own if authorized*/
  if (req.user.roleId.role.toString() !== 'Admin') {
    query = { _id: req.user.publishersId.congregationId };
  }
  console.log('query:', query);
  //
  return await Congregation.find(query, options)
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
    .catch(err => console.error(`Failed to find document: ${err}`));
};

module.exports = { listall };

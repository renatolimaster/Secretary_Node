var ObjectId = require('mongoose').Types.ObjectId;
/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const getAll = ({ Congregation }, { config }) => async (req, res, next) => {
  console.log('=============> Congregation getAll <===================');
  console.log('user:', req.user);

  const query = {};
  const options = {}; // limit clause return only first attribute
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

module.exports = { getAll };

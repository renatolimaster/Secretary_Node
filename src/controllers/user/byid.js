const { userProjectionFull } = require('./projections');
const byid = ({ User }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  console.log('=============> Congregation get <===================');
  //
  const query = { _id: _id };
  const options = {}; // limit clause return only first attribute
  //
  return await User.findById(query, options)
    .select(userProjectionFull)
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(403).send('No document matches the provided query.');
      }
      return results;
    })
    .catch(e => console.error(`Failed to find document: ${e}`));
};

module.exports = { byid };
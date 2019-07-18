const getById = ({ User }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  console.log('=============> Congregation get <===================');
  //
  const query = { _id: _id };
  const options = {}; // limit clause return only first attribute
  //
  return await User.findById(query, options)
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
    .catch(e => console.error(`Failed to find document: ${e}`));
};

module.exports = { getById };

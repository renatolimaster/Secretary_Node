const get = ({ User }, { config }) => async (req, res, next) => {
  /* const { _id } = req.params;
  console.log('=============> Congregation get <===================', _id);
  //
  const query = { _id: _id };
  const options = {}; // limit clause return only first attibute
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
    .catch(err => console.error(`Failed to find document: ${err}`)); */
  res.send(req.user);
};

module.exports = { get };

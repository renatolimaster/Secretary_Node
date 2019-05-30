const get = ({ Publicador }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  console.log('=============> Publicador get <===================', _id);
  //
  const query = { _id: _id };
  const options = {}; // limit number clause return attribute order
  //
  return await Publicador.findOne(query, options)
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
    .catch(err => res.status(400).send(err));
};

module.exports = { get };

const { projectionBasic } = require('./projections');

const get = ({ Publisher }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  console.log('=============> Publisher get <===================', _id);
  //
  const query = { _id: _id };
  let options = projectionBasic; // differ of pagination (see list.js - congregation)
  //
  console.log(req.user);
  return await Publisher.find(query, options)
    .populate('congregationId', 'number name')
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

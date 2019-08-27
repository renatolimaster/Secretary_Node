const { publisherProjectionFull } = require('./projections');
const idValidate = require('../../utils/idValidate');

const byid = ({ Publisher }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  const idIsValid = await idValidate(_id);
  if (!idIsValid) {
    return res.status(403).send('Invalid id!');
  }
  //
  const query = { _id: _id };
  let options = publisherProjectionFull; // differ of pagination (see list.js - congregation)
  //
  console.log(req.user);
  await Publisher.findById(query, options)
    .populate('congregationId', 'number name default')
    .then(results => {
      if (results) {
        console.log(`Successfully found document: ${results}.`);
        return res.status(200).send(results);
      } else {
        console.log('No document matches the provided query.');
        return res.status(403).send('No document matches the provided query.');
      }
    })
    .catch(err => res.status(400).send(err));
};

module.exports = { byid };

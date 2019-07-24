/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const byid = ({ Congregation }) => async (req, res) => {
  console.log('=============> Congregation get <===================');
  const { _id } = req.params;
  //
  let query = {};
  let options = {}; // limit clause return only first attribute
  /*  admin can access any congregation otherwise only its own */
  if (req.user.role.toString() === 'admin') {
    query = { _id: _id };
  } else {
    query = { _id: req.user.publishersId.congregationId };
  }
  console.log('query:', query);
  //
  return await Congregation.find(query, options)
    .populate('publishers', 'firstName lastName phones email') // virtual attribute
    .populate('coordinatorId', 'firstName lastName phones email')
    .populate('modifiedBy', 'firstName lastName phones email')
    .then(congregation => {
      if (congregation) {
        // console.log(`Successfully found document: \n${congregation}.`);
        res.status(200).send({ congregation, publishers: congregation.publishers });
      } else {
        // console.log('No document matches the provided query.');
        res.status(403).send('No document matches the provided query.');
      }
      // return congregation;
    })
    .catch(err => res.status(400).send(err));
};

module.exports = { byid };

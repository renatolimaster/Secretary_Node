let ObjectId = require('mongoose').Types.ObjectId;
const { User } = require('../../models/user');

const get = ({ Congregation }, { config }) => async (req, res, next) => {
  const { _id } = req.params;
  console.log('=============> Congregation get <===================');

  // console.log('token:', req.user);
  //
  const query = { _id: _id };
  const options = {}; // limit clause return only first attribute
  //
  return await Congregation.findOne(query, options)
    .populate('publishers')
    .populate('coordinatorId')
    .populate('modifiedBy')
    .then(congregation => {
      if (congregation) {
        // console.log(`Successfully found document: \n${congregation}.`);
        res
          .status(200)
          .send({ congregation, publishers: congregation.publishers });
      } else {
        // console.log('No document matches the provided query.');
        res.status(403).send('No document matches the provided query.');
      }
      // return congregation;
    })
    .catch(err => res.status(400).send(err));
};

module.exports = { get };

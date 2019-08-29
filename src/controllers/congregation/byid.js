const idValidate = require('../../utils/idValidate');
/**
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const byid = ({ Congregation }) => async (req, res) => {
  console.log('=============> Congregation byid get <===================');
  const { _id } = req.params;
  let message = { msg: '' };
  const idIsValid = await idValidate(_id);
  if (!idIsValid) {
    return res.status(403).send('Invalid id!');
  }
  //
  let query = {};
  let options = {}; // limit clause return only first attribute
  /*  admin can access any congregation otherwise only its own */
  console.log('user:', req.user.roleId.role);
  if (req.user.roleId.role === 'Admin') {
    console.log('1:', req.user.roleId.role);
    query = { _id: _id };
  } else {
    console.log('2:', req.user.roleId.role);
    query = { _id: req.user.publishersId.congregationId };
  }
  console.log('query:', query);
  //
  const congregation = await Congregation.findById(query, options);

  if (congregation) {
    // console.log(`Successfully found document: \n${congregation}.`);
    return res.status(200).send(congregation);
  } else {
    // console.log('No document matches the provided query.');
    message.msg = 'No document matches the provided query.';
    return res.status(403).send(message);
  }
};

module.exports = { byid };

const idValidate = require('../../utils/idValidate');
const log = console.log;
const byid = ({ FieldService }) => async (req, res) => {
  log('=============> Congregation byid get <===================');
  const { _id } = req.params;
  let message = { msg: '' };
  const role = req.user.roleId.role;
  const publisherId = req.user.publishersId._id;
  const idIsValid = await idValidate(_id);
  if (!idIsValid) {
    return res.status(403).send('Invalid id!');
  }

  try {
    const fieldService = await FieldService.findById(_id);

    if (fieldService === false) {
      message.msg = `The field service not found.`;
      res.status(403).send(message);
    }
    /* Admin role can see all field service other roles only can see his own field service */
    if (role !== 'Admin') {
      if (fieldService.publisherId._id.toString() !== publisherId.toString()) {
        message.msg = 'The field service does not belong to the logged in user.';
        return res.status(403).send(message);
      }
    }

    return res.status(200).send(fieldService);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { byid };

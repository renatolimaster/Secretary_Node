const log = console.log;
const remove = ({ Publisher }, { config }) => async (req, res, next) => {
  console.log('================> Publisher remove <======================');
  const { _id } = req.params;
  try {
    if (req.user.publishersId === null) {
      return res.status(403).send('User not linked to a publisher');
    }
    /* Checks if user are linked to congregation */
    if (req.user.publishersId.congregationId === null) {
      return res.status(403).send('User not linked to a congregation');
    }
    const congregationId = req.user.publishersId.congregationId;
    const userPublisherId = req.user.publishersId._id;
    const role = req.user.roleId.role;
    let query = {};

    if (_id.toString() === userPublisherId.toString()) {
      /* The user cannot remove himself. */
      return res.status(403).send('You cannot remove yourself!');
    }

    /* 
  The Admin user can remove any publisher (even if not linked to a congregation) and other only for their same congregation.
  */
    if (role === 'Admin') {
      query = { _id };
    } else if (role === 'Overseer' || role === 'Secretary' || role === 'Elder') {
      query = { _id, congregationId };
    } else {
      log('role:', role);
      return res.status(403).send('Unauthorized to remove.');
    }
    log('query:', query);

    const publisher = await Publisher.findOne(query);
    if (!publisher) {
      return res.status(403).send('The publisher provided not found in your congregation/supervision!');
    }
    log('Publisher:', publisher);
    return res.status(201).send('Publisher was removed successfully!');
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { remove };

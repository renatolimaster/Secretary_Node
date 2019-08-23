const _ = require('lodash');
const update = ({ Office }, { options }) => async (req, res, next) => {
  console.log('================= Office remove =======================');
  const { _id } = req.params;
  // extract only key of body
  const updates = Object.keys(req.body);
  // only attributes declared in allowedUpdates below are permitted to be updated
  const allowedUpdates = ['type', 'name', 'officeId', 'address', 'phones', 'email'];
  // to check if attributes are permitted
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid attributes to update!' });
  }
  try {
    const office = await Office.findById(_id);
    if (!office) {
      return res.status(403).send('Office not found');
    }
    // map automatically attributes
    _.extend(office, req.body);
    office.modifyBy = req.user.publisherId;
    office.save();
    return res.status(200).send(office);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { update };

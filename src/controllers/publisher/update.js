const { message } = require('../../utils/messages');
const _ = require('lodash');
const update = ({ Publisher, Congregation, User }, { options }) => async (req, res, next) => {
  log('=============> Publisher Update <===================');
  const { _id } = req.params;
  const { firstName, middleName, lastName, congregationId, userId } = req.body;
  let hasPublisher;

  try {
    /*  Checks if the congregation exist */
    const congregation = await Congregation.findById({ _id: congregationId });

    if (!congregation) {
      return res.status(400).send('The congregation informed was not found!');
    }

    let publisher = await Publisher.findById(_id);
    if (!publisher) {
      message.msg = 'Publisher not found!';
      return res.status(403).send(message, _id);
    }
    /* Checks if the provided user exists. */
    if (userId) {
      if (userId !== publisher.userId) {
        const user = await User.findById({ _id: userId });

        if (!user) {
          return res.status(403).send('This provided user was not found!');
        } else {
          /* Checks if the user is linked to another publisher */
          bindingCode = user.bindingCode;
          await User.findByNotIdAndBindingCode(user._id, bindingCode)
            .then(result => {
              hasPublisher = result;
            })
            .catch(error => {
              console.log('error:', error);
              return res.status(400).send(error);
            });
          if (hasPublisher) {
            if (hasPublisher.publishersId) {
              return res.status(400).send('That user provided is already linked with another publisher!');
            }
          }
        }
      }
    }
    
    // map automatically attributes
    _.extend(publisher, req.body);
    publisher.fullName = firstName + ' ' + middleName + ' ' + lastName;
    publisher.modifiedBy = req.user.publishersId;
    await publisher.save().then(publisher =>
      publisher
        .populate({
          path: 'congregationId',
          populate: { path: 'circuitId', model: 'circuits', populate: { path: 'officeId', model: 'offices' } },
        })
        .execPopulate(),
    );
    return res.status(201).send(publisher);
  } catch (error) {
    log(error);
    return res.status(400).send(error);
  }
};

module.exports = { update };

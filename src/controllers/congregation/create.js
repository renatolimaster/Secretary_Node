/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const create = ({ Congregation }) => async (req, res) => {
  console.log('================> Congregation create <======================');
  const { number, name } = req.body;
  let hasCongregation;
  await Congregation.findDuplicate(number, name)
    .then(result => {
      hasCongregation = result;
    })
    .catch(error => {
      console.log('error:', error);
      return res.status(400).send(error);
    });

  if (hasCongregation) {
    console.log('hasCongregation:', hasCongregation);
    return res.status(400).send(`There is congregation with number "${number}" and name "${name}" registered.`);
  }

  try {
    const congregation = new Congregation({
      ...req.body,
    });
    congregation.modifiedBy = req.user.publishersId;
    await congregation.save();
    return res.status(201).send(congregation);
  } catch (error) {
    console.log('error:', error);
    return res.status(400).send(error);
  }
};

module.exports = { create };

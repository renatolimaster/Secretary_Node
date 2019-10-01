const { message } = require('../../utils/messages');
const log = console.log;
const create = ({ Pioneer, Congregation }) => async (req, res) => {
  console.log('================> Congregation create <======================');
  const { description, requirement, congregationId } = req.body;
  let pioneer;
  let hasSamePioneer = true;
  try {
    // check id congregation exist
    const congregation = await Congregation.findById(congregationId);

    if (congregation === false) {
      message.msg = 'Congregation not found!';
      return res.status(404).send(message);
    }
    // check if there is the same description of the same congregation
    hasSamePioneer = await Pioneer.findByDescriptionCongregationId(description, congregationId);
    
    if (hasSamePioneer) {
      message.msg = 'This description is already registered!';
      return res.status(400).send(message);
    }
    
    pioneer = new Pioneer({ ...req.body });

    await pioneer.save();
  } catch (error) {
    return res.status(400).send(error);
  }

  return res.status(200).send(pioneer);
};

module.exports = { create };

const log = console.log;
const bybindingcode = ({ User }, { config }) => async (req, res, next) => {
  log('================> User bybindingcode <======================');
  const { bindingcode } = req.params;
  log('bindingcode:', bindingcode);
  if (!bindingcode) {
    return res.status(403).send('Please provide a biding code!');
  }
  try {
    const user = await User.findByBindingCode(bindingcode);
    log('User 2:', user);
    if (!user) {
      return res.status(403).send('User not found!');
    }
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { bybindingcode };

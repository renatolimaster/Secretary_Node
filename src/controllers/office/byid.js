const log = console.log;
const byid = ({ Office }, { options }) => async (req, res, next) => {
  log('=============> Office byid <===================');
  const { _id } = req.params;

  try {
    const office = await Office.findById(_id);
    if (!office) {
      return res.status(403).send('Office not found!');
    }
    return res.status(201).send(office);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { byid };

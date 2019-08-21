const log = console.log;
const create = ({ Circuit }, { config }) => async (req, res, next) => {
  console.log('================> Circuit create <======================');
  const { number, notes, officeId, overseerId } = req.body;
  try {
    const hasCircuit = await Circuit.findByNumberAndOffice(number, officeId);
    log('Circuit:', hasCircuit);
    if (hasCircuit) {
      return res.status(403).send(`Circuit "${hasCircuit.number}" already registered for the "${hasCircuit.officeId.type}"!`);
    }
    const circuit = new Circuit({
      ...req.body,
    });
    circuit.modifiedBy = req.user.publishersId;
    circuit.save();
    log(number, notes, officeId, overseerId);
    return res.status(201).send(circuit);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { create };

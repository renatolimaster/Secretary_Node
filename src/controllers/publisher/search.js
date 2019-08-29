const { publisherProjectionFull } = require('../../models/publisher/projections');
const { paginates } = require('../../utils/paginate');
log = console.log;
const search = ({ Publisher }, { config }) => async (req, res, next) => {
  log('================> Publisher search <======================');
  const publishersId = req.user.publishersId;
  const message = { msg: '' };
  if (publishersId === undefined) {
    message.msg = 'User has no linked publisher!';
    return res.status(403).send(message);
  }
  const congregationId = req.user.publishersId.congregationId;
  if (congregationId === undefined) {
    message.msg = 'Congregation not found for user!';
    return res.status(403).send(message);
  }
  //
  const role = req.user.roleId.role;
  let { search } = req.query;
  // skip = skip ? parseInt(skip, 10) : 0;
  // limit = limit ? parseInt(limit, 10) : 100;
  if (search.length < 3) {
    message.msg = 'Please provide at least 3 characters to search!';
    return res.status(400).send(message);
  }
  let query = {};
  if (search) {
    if (role === 'Admin') {
      query = { fullName: new RegExp(`${search}`, 'i') };
    } else {
      query = { fullName: new RegExp(`${search}`, 'i'), congregationId };
    }
    log('query:', query);
  }

  let options = {
    select: publisherProjectionFull,
    sort: { firstName: -1 },
    populate: [{ path: 'congregationId', populate: { path: 'circuitId', model: 'circuits', populate: { path: 'officeId', model: 'offices' } } }],
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Publisher, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    message.msg = 'Docs not found!';
    return res.status(400).send(message);
  }
};

module.exports = { search };

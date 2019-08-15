const { publisherProjectionFull } = require('./projections');
log = console.log;
const search = ({ Publisher }, { config }) => async (req, res, next) => {
  log('================> Publisher search <======================');
  const congregationId = req.user.publishersId.congregationId;
  const role = req.user.roleId.role;
  let { search } = req.query;
  // skip = skip ? parseInt(skip, 10) : 0;
  // limit = limit ? parseInt(limit, 10) : 100;
  if (search.length < 3) {
    return res.status(400).send('Please provide at least 3 characters to search!');
  }
  let query = {};
  if (search) {
    if (role === 'Admin') {
      query = { firstName: new RegExp(`${search}`, 'i') };
    } else {
      query = { firstName: new RegExp(`${search}`, 'i'), congregationId };
    }
    log('query:', query);
  }

  let options = {
    select: publisherProjectionFull,
    sort: { firstName: -1 },
    populate: 'congregationId',
    lean: true,
    page: 1,
    limit: 10,
  };

  await Publisher.paginate(query, options)
    .then(results => {
      log(query);
      log('response:', results);
      if (results.docs.length) {
        log(`Successfully found document: ${results}.`);
        res.status(200).send(results);
      } else {
        log('No document matches the provided query.');
        res.status(403).send('No document matches the provided query.');
      }
    })
    .catch(error => {
      console.error(`Failed to find document: ${error}`);
      res.status(403).send(`Failed to find document: ${error}`);
    });
};

module.exports = { search };

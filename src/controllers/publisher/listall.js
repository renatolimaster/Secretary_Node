const log = console.log;
const { publisherProjectionFull } = require('./projections');
const listall = ({ Publisher }) => async (req, res) => {
  log('================> Publisher listall <======================');
  const congregationId = req.user.publishersId.congregationId;
  const role = req.user.roleId.role;
  let query = {};

  if (role !== 'Admin') {
    query = { congregationId };
  }
  log('query:', query);

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
        res.status(403).send('No documents match the query!');
      }
    })
    .catch(error => {
      console.error(`Failed to find document: ${error}`);
      res.status(403).send(`Failed to find document: ${error}`);
    });
};

module.exports = { listall };

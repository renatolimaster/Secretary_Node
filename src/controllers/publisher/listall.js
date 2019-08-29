const log = console.log;
const { publisherProjectionFull } = require('../../models/publisher/projections');
const { paginates } = require('../../utils/paginate');
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

  const results = await paginates(Publisher, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }

  /* 
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
    }); */
};

module.exports = { listall };

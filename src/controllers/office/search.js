const { officeProjectionsFull } = require('./projections');
const { paginates } = require('../../utils/paginate');
const search = ({ Office }, { options }) => async (req, res, next) => {
  console.log('================= Office remove =======================');
  let { search } = req.query;
  // skip = skip ? parseInt(skip, 10) : 0;
  // limit = limit ? parseInt(limit, 10) : 100;

  if (search.length < 3) {
    return res.status(403).send('Provide at least three letters, please!');
  }

  let query = {};
  if (search) {
    query = { name: new RegExp(`${search}`, 'i') };
    log('query:', query);
  }

  let options = {
    select: officeProjectionsFull,
    sort: { name: -1 },
    populate: 'publishers',
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Office, query, options);
  
  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }
};

module.exports = { search };

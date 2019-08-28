const { projectionFull } = require('./projections');
const { paginates } = require('../../utils/paginate');
const search = ({ Circuit }, { config }) => async (req, res, next) => {
  console.log('================= Circuit search =======================');

  let { search } = req.query;
  // skip = skip ? parseInt(skip, 10) : 0;
  // limit = limit ? parseInt(limit, 10) : 100;

  if (search.length < 3) {
    return res.status(403).send('Provide at least three letters, please!');
  }

  let query = {};
  if (search) {
    query = { identification: new RegExp(`${search}`, 'i') };
    log('query:', query);
  }

  let options = {
    select: projectionFull,
    sort: { identification: -1 },
    populate: 'publishers',
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Circuit, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }
};

module.exports = { search };

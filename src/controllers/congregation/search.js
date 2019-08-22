const { projectionFull } = require('./projections');
const log = console.log;
const { paginates } = require('../../utils/paginate');
/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const search = ({ Congregation }) => async (req, res) => {
  /*
req.params contains route parameters (in the path portion of the URL), and
req.query contains the URL query parameters (after the ? in the URL).
  */
  console.log('================> Congregation search <======================');
  console.log('role:', req.user.role);

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

  // ***** this works
  // return await Congregation.find(query, options)
  //   .select(projectionFull)
  //   .sort({ name: 1 })
  //   .then(results => {
  //     if (results) {
  //       console.log(`Successfully found document: ${results}.`);
  //       res.status(200).send(results);
  //     } else {
  //       console.log('No document matches the provided query.');
  //       res.status(403).send('No document matches the provided query.');
  //     }
  //     return results;
  //   })
  //   .catch(err => console.error(`Failed to find document: ${err}`));
  // *******

  let options = {
    select: projectionFull,
    sort: { name: -1 },
    populate: 'publishers',
    lean: true,
    page: 1,
    limit: 10,
  };

  const results = await paginates(Congregation, query, options);

  if (results) {
    return res.status(200).send(results);
  } else {
    return res.status(400).send('Docs not found!');
  }
  /* 
  Congregation.paginate(query, options)
    .then(results => {
      log(query);
      log('response:', results);
      if (results) {
        //  console.log(`Successfully found document: ${results}.`);
        res.status(200).send(results);
      } else {
        // console.log('No document matches the provided query.');
        res.status(403).send('No document matches the provided query.');
      }
    })
    .catch(error => {
      console.error(`Failed to find document: ${error}`);
      res.status(403).send(`Failed to find document: ${error}`);
    }); */
};

module.exports = { search };

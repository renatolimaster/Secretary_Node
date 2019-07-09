const _ = require('lodash');
const { projectionFull } = require('./projections');
const log = console.log;

/**
 *
 *
 * @param {*} { Congregation }
 * @param {*} { config }
 */
const list = ({ Congregation }, { config }) => async (req, res, next) => {
  /*
req.params contains route parameters (in the path portion of the URL), and
req.query contains the URL query parameters (after the ? in the URL).
  */
  console.log('================> Congregation list <======================');
  
  let { limit, skip, search } = req.query;
  // skip = skip ? parseInt(skip, 10) : 0;
  // limit = limit ? parseInt(limit, 10) : 100;

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
      /**
     * Response looks like:
     * {
     *   docs: [...] // array of Posts
     *   total: 42   // the total number of Posts
     *   limit: 10   // the number of Posts returned per page
     *   page: 2     // the current page of Posts returned
     *   pages: 5    // the total number of pages
     * }

    */
    })
    .catch(error => {
      console.error(`Failed to find document: ${error}`);
      res.status(403).send(`Failed to find document: ${error}`);
    });
};

module.exports = { list };

const _ = require('lodash');

const list = ({ Congregation }, { config }) => async (req, res, next) => {
  /*
req.params contains route parameters (in the path portion of the URL), and
req.query contains the URL query parameters (after the ? in the URL).
  */
  console.log('================> Congregation list <======================');
  // const congregacoes = await Congregation.find({});
  // res
  //   .status(200)
  //   .send('===============> LIST <=====================', congregacoes);
  let { limit, skip, search } = req.query;
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 100;

  const query = {};
  if (search) {
    _.extend(query, { name: new RegExp(`${search}`, 'i') });
  }
  // try {
  //   const congregations = await Question.find(query)
  //     .skip(skip)
  //     .limit(limit)
  //     .sort({ _id: -1 });

  //   // res.status(200).send({ congregations });
  //   res.status(200).send('===============> LIST <=====================');
  // } catch (error) {
  //   next(error);
  // }

  const { _id } = req.params;
  console.log('skip', skip);
  console.log('limit', limit);
  console.log('search', search);
  console.log('_id', _id);

  // const query = { id: _id };
  // const options = {}; // limit clause return only first attribute
  // return await Congregation.find(query, options)
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

  res.status(200).send(query);
};

module.exports = { list };

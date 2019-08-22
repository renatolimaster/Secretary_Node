/* 
used with mongoose-paginate-v2 to generalize for any model
*/
const paginates = async (model, query, options) => {
  console.log('========= paginates =============');
  let result;
  await model
    .paginate(query, options)
    .then(results => {
      log(query);
      log('response:', results);
      if (results.totalDocs > 0) {
        // console.log(`Successfully found document: ${results}.`);
        result = results;
      } else {
        // console.log('No document matches the provided query.');
        result = false;
      }
    })
    .catch(error => {
      console.error(`Failed to find document: ${error}`);
      res.status(403).send(`Failed to find document: ${error}`);
    });

  return result;
};

module.exports = { paginates };

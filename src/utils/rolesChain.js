var url = require('url');

const roles = function(req, res, next) {
  let model = req.originalUrl.split('/')[3].toString();
  let action = req.url
    .match('^[^?]*')[0]
    .split('/')
    .slice(1)[0]
    .toString();
  console.log(action);
  console.log(model);
  if (req.user.privilege === 'elder') {
    if (model === 'congregation') {
      console.log(req.user.privilege);
      if (action === 'update') {
        console.log('unauthorized');
        res.status(403).send('Unauthorized');
      }
    }
  }
  next();
};

module.exports = roles;

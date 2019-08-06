const { Router: router } = require('express');

const { create } = require('./create');
const { byid } = require('./byid');

const publisher = (auth, roles, validation, models, { config }) => {
  const api = router();
  api.get('/byid/:_id', [auth, roles], byid(models, { config }));
  api.post('/create', [auth, roles, validation], create(models, { config }));

  return api;
};

module.exports = publisher;

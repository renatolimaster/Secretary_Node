const { Router: router } = require('express');

const { create } = require('./create');
const { byid } = require('./byid');
const { release } = require('./release');

const publisher = (auth, roles, validation, models, { config }) => {
  const api = router();
  api.get('/byid/:_id', [auth, roles], byid(models, { config }));
  api.post('/create', [auth, roles, validation], create(models, { config }));
  api.post('/release/:_id/:congregationId', [auth, roles], release(models, { config }));

  return api;
};

module.exports = publisher;

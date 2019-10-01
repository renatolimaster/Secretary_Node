const { Router: router } = require('express');

const { byid } = require('./byid');
const { listall } = require('./listall');
const { search } = require('./search');
const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');

const pioneer = (auth, roles, validation, models, { config }) => {
  const api = router();

  api.get('/search', [auth, roles], search(models, { config }));
  api.get('/listall', [auth, roles], listall(models, { config }));
  api.get('/byid/:_id', [auth, roles], byid(models, { config }));
  api.post('/create', [auth, roles, validation], create(models, { config }));
  api.patch('/update/:_id', [auth, roles, validation], update(models, { config }));
  api.delete('/remove/:_id', [auth, roles], remove(models, { config }));

  return api;
};

module.exports = { pioneer };
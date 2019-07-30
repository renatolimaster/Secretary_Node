const { Router: router } = require('express');

const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');
const { byid } = require('./byid');

const role = (auth, roles, validation, models, { config }) => {
  const api = router();
  api.get('/byid/:_id', [auth, roles], byid(models, { config }));
  api.post('/create', [auth, roles], create(models, { config }));
  api.patch('/update/:_id', [auth, roles, validation], update(models, { config }));
  api.delete('/remove/:_id', [auth, roles], remove(models, { config }));

  return api;
};

module.exports = { role };

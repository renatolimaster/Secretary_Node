const { Router: router } = require('express');

const { create } = require('./create');
const { update } = require('./update');

const role = (auth, roles, validation, models, { config }) => {
  const api = router();
  // api.get('/byid/:_id', [auth, roles], get(models, { config }));
  api.post('/create', [auth, roles], create(models, { config }));
  api.patch('/update/:_id', [auth, roles, validation], update(models, { config }));

  return api;
};

module.exports = { role };

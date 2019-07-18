const { Router: router } = require('express');

const { create } = require('./create');

const role = (auth, roles, models, { config }) => {
  const api = router();
  // api.get('/byid/:_id', [auth, roles], get(models, { config }));
  api.post('/create', [auth, roles], create(models, { config }));

  return api;
};

module.exports = { role };

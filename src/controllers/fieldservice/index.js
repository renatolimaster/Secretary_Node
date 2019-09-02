const { Router: router } = require('express');

const { create } = require('./create');
const { initialize } = require('./initialize');

const fieldservice = (auth, roles, validation, models, { config }) => {
  const api = router();

  // api.get('/search', [auth, roles], search(models, { config }));
  // api.get('/listall', [auth, roles], listall(models, { config }));
  // api.get('/byid/:_id', [auth, roles], byid(models, { config }));
  api.post('/initialize/:congregationId', [auth, roles], initialize(models, { config }));
  api.post('/create', [auth, roles, validation], create(models, { config }));
  // api.patch('/update/:_id', [auth, roles, validation], update(models, { config }));
  // api.delete('/remove/:_id', [auth, roles], remove(models, { config }));

  return api;
};

module.exports = { fieldservice };

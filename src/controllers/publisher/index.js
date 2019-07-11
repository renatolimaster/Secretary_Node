const { Router: router } = require('express');

const { create } = require('./create');
const { get } = require('./get');

const publisher = (auth, roles, models, { config }) => {
  const api = router();
  api.get('/:_id', [auth, roles], get(models, { config }));
  api.post('/', [auth, roles], create(models, { config }));

  return api;
};

module.exports = publisher;

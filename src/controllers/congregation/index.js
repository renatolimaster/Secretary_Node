const { Router: router } = require('express');

const { get } = require('./get');
const { getAll } = require('./getAll');
const { list } = require('./list');
const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');

/**
 *
 *
 * @param {*} auth
 * @param {*} models
 * @param {*} { config }
 * @returns
 */
const congregation = (auth, roles, models, { config }) => {
  const api = router();

  api.get('/search', [auth, roles], list(models, { config }));
  api.get('/listall', [auth, roles], getAll(models, { config }));
  api.get('/byid/:_id', [auth, roles], get(models, { config }));
  api.post('/create', [auth, roles], create(models, { config }));
  api.patch('/update/:_id', [auth, roles], update(models, { config }));
  api.delete('/remove/:_id', [auth, roles], remove(models, { config }));

  return api;
};

module.exports = congregation;
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
const congregation = (auth, models, { config }) => {
  const api = router();

  api.get('/', auth, list(models, { config }));
  api.get('/all', auth, getAll(models, { config }));
  api.get('/:_id', auth, get(models, { config }));
  api.post('/', auth, create(models, { config }));
  api.patch('/:_id', auth, update(models, { config }));
  api.delete('/:_id', auth, remove(models, { config }));

  return api;
};

module.exports = congregation;

/* module.exports = (models, { config }) => {
  const api = router();

  api.get('/', auth, list(models, { config }));
  api.get('/:_id', get(models, { config }));
  api.get('/all/:_id', auth, getAll(models, { config }));
  api.post('/', auth, create(models, { config }));
  api.patch('/:_id', auth, update(models, { config }));
  api.delete('/:_id', auth, remove(models, { config }));

  return api;
}; */

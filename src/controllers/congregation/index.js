const { Router: router } = require('express');

const { get } = require('./get');
const { getAll } = require('./getAll');
const { list } = require('./list');
const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');
/**
 * Provide api for congregation
 *
 *
 * GET /api/v1/congregation/ - List
     @header
            Authorization: Bearer {token}
     @optionalQueryParameters
           search {String} - value to search
           limit {Number} - count of item to send
           skip {Number} - value to search
 *
 *
 * **/

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

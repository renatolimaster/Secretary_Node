const { Router: router } = require('express');
const auth = require('../../middleware/auth');

const { get } = require('./get');
const { getById } = require('./getById');
const { getAll } = require('./getAll');
const { list } = require('./list');
const { login } = require('./login');
const { logout } = require('./logout');
const { logoutAll } = require('./logouAll');
const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');

const user = (auth, models, { config }) => {
  const api = router();
  // api.get('/', auth, list(models, { config }));
  api.get('/profile', auth, get(models, { config }));
  api.get('/:_id', auth, getById(models, { config }));
  // api.get('/all/:_id', auth, getAll(models, { config }));
  api.post('/', auth, create(models, { config }));
  api.patch('/:_id', auth, update(models, { config }));
  api.post('/login', login(models, { config }));
  api.post('/logout', auth, logout(models, { config }));
  api.post('/logoutAll', auth, logoutAll(models, { config }));
  // api.delete('/:_id', auth,remove(models, { config }));

  return api;
};

module.exports = user;
/*
module.exports = (models, { config }) => {
  const api = router();
  // api.get('/', auth, list(models, { config }));
  api.get('/profile', auth, get(models, { config }));
  api.get('/:_id', auth, getById(models, { config }));
  // api.get('/all/:_id', auth, getAll(models, { config }));
  api.post('/', auth, create(models, { config }));
  api.patch('/:_id', auth, update(models, { config }));
  api.post('/login', login(models, { config }));
  api.post('/logout', auth, logout(models, { config }));
  api.post('/logoutAll', auth, logoutAll(models, { config }));
  // api.delete('/:_id', auth,remove(models, { config }));

  return api;
};
 */

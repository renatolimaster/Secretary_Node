const { Router: router } = require('express');
const auth = require('../../middleware/auth');

const { byid } = require('./byid');
const { listall } = require('./listall');
const { login } = require('./login');
const { logout } = require('./logout');
const { logoutall } = require('./logoutall');
const { create } = require('./create');
const { update } = require('./update');
const { remove } = require('./remove');

const users = (auth, roles, validation, models, { config }) => {
  const api = router();
  api.get('/byid/:_id', [auth, roles], byid(models, { config }));
  api.get('/listall', auth, listall(models, { config }));
  api.post('/create', create(models, { config }));
  api.patch('/update/:_id', [auth, roles, validation], update(models, { config }));
  api.post('/login', login(models, { config }));
  api.post('/logout', [auth, roles], logout(models, { config }));
  api.post('/logoutall', [auth, roles], logoutall(models, { config }));
  api.delete('/remove/:_id', [auth, roles], remove(models, { config }));

  return api;
};

module.exports = { users };
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

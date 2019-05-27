const { Router: router } = require('express');

const { create } = require('./create');
const { get } = require('./get');

const publisher = (auth, models, { config }) => {
  const api = router();
  api.get('/:_id', auth, get(models, { config }));
  api.post('/', auth, create(models, { config }));

  return api;
};

module.exports = publisher;

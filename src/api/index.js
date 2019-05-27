const express = require('express');
const auth = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

// list of models
const { Congregacao } = require('../models/congregacao');
// console.log('Congregacao:', Congregacao);
const { User } = require('../models/usuario');
// console.log('User:', User);
const { Publicador } = require('../models/publicador');
// console.log('Publicador:', Publicador);

// list of controllers
const congregacoes = require('../controllers/congregacao');
const users = require('../controllers/usuario');
const publicadores = require('../controllers/publicador');

// combine all models into one object to path it into controllers
const models = { Congregacao, User, Publicador };

// routers
const routersInit = config => {
  const router = express();
  // register api Endpoints
  // USER
  config = auth;
  // USER
  router.use('/user', users(auth, models, { config }));
  // CONGREGATION
  router.use('/congregacao', congregacoes(auth, models, { config }));
  // PUBLISHERS
  router.use('/publicador', publicadores(auth, models, { config }));
  // catch api all erros
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;

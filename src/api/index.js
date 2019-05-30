const express = require('express');
const auth = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

// list of models
const { Congregation } = require('../models/congregation');
const { User } = require('../models/usuario');
const { Publicador } = require('../models/publicador');

// list of controllers
const congregation = require('../controllers/congregation');
const users = require('../controllers/user');
const publisher = require('../controllers/publisher');

// combine all models into one object to path it into controllers
const models = { Congregation, User, Publicador };

// routers
const routersInit = config => {
  const router = express();
  // register api Endpoints
  // USER
  config = auth;
  // USER
  router.use('/user', users(auth, models, { config }));
  // CONGREGATION
  router.use('/congregation', congregation(auth, models, { config }));
  // PUBLISHERS
  router.use('/publisher', publisher(auth, models, { config }));
  // catch api all erros
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;

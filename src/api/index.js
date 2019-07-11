const express = require('express');
const roles = require('../utils/rolesChain');
const auth = require('../middleware/auth');
const {
  errorHandler
} = require('../middleware/errorHandler');

// list of models
const {
  Congregation
} = require('../models/congregation');
const {
  User
} = require('../models/user');
const {
  Publisher
} = require('../models/publisher');

// list of controllers
const congregation = require('../controllers/congregation');
const users = require('../controllers/user');
const publisher = require('../controllers/publisher');

// combine all models into one object to path it into controllers
const models = {
  Congregation,
  User,
  Publisher
};

// routers
const routersInit = config => {
  const router = express();
  // register api Endpoints
  // USER
  config = auth;
  // USER
  router.use('/user', users(auth, roles, models, {
    config
  }));
  // CONGREGATION
  router.use('/congregation', congregation(auth, roles, models, {
    config
  }));
  // PUBLISHERS
  router.use('/publisher', publisher(auth, roles, models, {
    config
  }));
  // catch api all errors
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;
const express = require('express');
const roles = require('../utils/rolesChain');
const auth = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

const { validation } = require('../middleware/validation');
const { validationCongregationSchema } = require('../models/congregation/validationSchema');
const { validationUserSchema } = require('../models/user/validationSchema');
const { validationPublisherSchema } = require('../models/publisher/validationSchema');
const { roleValidationSchema } = require('../models/role/validationSchema');

// list of models
const { Congregation } = require('../models/congregation');
const { User } = require('../models/user');
const { Publisher } = require('../models/publisher');
const { Role } = require('../models/role');

// list of controllers
const congregation = require('../controllers/congregation');
const { users } = require('../controllers/user');
const publisher = require('../controllers/publisher');
const { role } = require('../controllers/role');

// combine all models into one object to path it into controllers
const models = {
  Congregation,
  User,
  Publisher,
  Role,
};

// routers
const routersInit = config => {
  const router = express();
  // register api Endpoints
  // USER
  config = auth;
  // USER
  router.use(
    '/user',
    users(auth, roles, validation(validationUserSchema.userValidation), models, {
      config,
    }),
  );
  // CONGREGATION
  router.use(
    '/congregation',
    congregation(auth, roles, validation(validationCongregationSchema.congregationValidation), models, {
      config,
    }),
  );
  // PUBLISHERS
  router.use(
    '/publisher',
    publisher(auth, roles, validation(validationPublisherSchema.publisherValidation), models, {
      config,
    }),
  );

  // ROLES
  router.use('/role', role(auth, roles, validation(roleValidationSchema.roleValidation), models, { config }));

  // catch api all errors
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;

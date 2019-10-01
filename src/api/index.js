const express = require('express');
const roles = require('../utils/rolesChain');
const auth = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');

const { validation } = require('../middleware/validation');
const { congregationValidationCongregationSchema } = require('../models/congregation/validationSchema');
const { userValidationSchema } = require('../models/user/validationSchema');
const { publisherValidationSchema } = require('../models/publisher/validationSchema');
const { roleValidationSchema } = require('../models/role/validationSchema');
const { officeValidationSchema } = require('../models/office/validationSchema');
const { circuitValidationSchema } = require('../models/circuit/validationSchema');
const { fieldserviceValidationSchema } = require('../models/field-service/validationSchema');
const { pioneerValidationSchema } = require('../models/pioneer/validationSchema');

// list of models
const { Congregation } = require('../models/congregation');
const { User } = require('../models/user');
const { Publisher } = require('../models/publisher');
const { Role } = require('../models/role');
const { Office } = require('../models/office');
const { Circuit } = require('../models/circuit');
const { FieldService } = require('../models/field-service');
const { Pioneer } = require('../models/pioneer');

// list of controllers
const { office } = require('../controllers/office');
const { congregation } = require('../controllers/congregation');
const { users } = require('../controllers/user');
const { publisher } = require('../controllers/publisher');
const { role } = require('../controllers/role');
const { circuit } = require('../controllers/circuit');
const { fieldservice } = require('../controllers/fieldservice');
const { pioneer } = require('../controllers/pioneer');

// combine all models into one object to path it into controllers
const models = {
  Office,
  Circuit,
  Congregation,
  User,
  Publisher,
  FieldService,
  Role,
  Pioneer,
};

// routers
const routersInit = config => {
  const router = express();
  // register api Endpoints
  // USER
  config = auth;
  // OFFICE
  router.use('/office', office(auth, roles, validation(officeValidationSchema.officeValidation), models, { config }));
  // CIRCUIT
  router.use('/circuit', circuit(auth, roles, validation(circuitValidationSchema.circuitValidation), models, { config }));
  // USER
  router.use(
    '/user',
    users(auth, roles, validation(userValidationSchema.userValidation), models, {
      config,
    }),
  );
  // CONGREGATION
  router.use(
    '/congregation',
    congregation(auth, roles, validation(congregationValidationCongregationSchema.congregationValidation), models, {
      config,
    }),
  );
  // PUBLISHERS
  router.use(
    '/publisher',
    publisher(auth, roles, validation(publisherValidationSchema.publisherValidation), models, {
      config,
    }),
  );
  // PIONEER
  router.use('/pioneer', pioneer(auth, roles, validation(pioneerValidationSchema.pioneerValidation), models, { config }));
  // FIELD SERVICES
  router.use('/fieldservice', fieldservice(auth, roles, validation(fieldserviceValidationSchema.fieldserviceValidation), models, { config }));
  // ROLES
  router.use('/role', role(auth, roles, validation(roleValidationSchema.roleValidation), models, { config }));

  // catch api all errors
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;

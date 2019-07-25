const Joi = require('joi');

const roleValidationSchema = {
  roleValidation: Joi.object().keys({
    role: Joi.string()
      .required()
      .valid('Admin', 'Overseer', 'Elder', 'Servant', 'Pioneer', 'Accounts', 'Publisher', 'Student'),
    model: Joi.array().items({
      name: Joi.string().required(),
      action: Joi.string().required(),
    }),
  }),
};

module.exports = { roleValidationSchema };

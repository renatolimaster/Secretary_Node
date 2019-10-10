const Joi = require('@hapi/joi');

const roleValidationSchema = {
  roleValidation: Joi.object().keys({
    role: Joi.string()
      .required()
      .valid('Admin', 'Circuit Overseer', 'Service Overseer', 'Coordinator', 'Secretary', 'Elder', 'Servant', 'Pioneer'),
    model: Joi.array().items({
      name: Joi.string().required(),
      action: Joi.array().items(Joi.string()),
    }),
  }),
};

module.exports = { roleValidationSchema };

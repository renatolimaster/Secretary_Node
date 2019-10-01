const Joi = require('@hapi/joi');

const pioneerValidationSchema = {
  pioneerValidation: Joi.object().keys({
    description: Joi.string()
      .required()
      .valid('None', 'Auxiliary 30 hours', 'Auxiliary Pioneer', 'Regular Auxiliary Pioneer', 'Regular Pioneer', 'Especial Pioneer', 'Missionary'),
    requirement: Joi.string().required(),
    congregationId: Joi.string().required(),
  }),
};

module.exports = { pioneerValidationSchema };

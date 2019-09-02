const Joi = require('@hapi/joi');

const circuitValidationSchema = {
  circuitValidation: Joi.object().keys({
    identification: Joi.string().required(),
    notes: Joi.string(),
    officeId: Joi.string().required(),
    overseerId: Joi.string(),
    modifiedBy: Joi.string(),
  }),
};

module.exports = { circuitValidationSchema };

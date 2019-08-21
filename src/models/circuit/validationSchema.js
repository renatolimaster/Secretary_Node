const Joi = require('joi');

const circuitValidationSchema = {
  circuitValidation: Joi.object().keys({
    number: Joi.string().required(),
    notes: Joi.string(),
    officeId: Joi.string().required(),
    overseerId: Joi.string(),
    modifiedBy: Joi.string(),
  }),
};

module.exports = { circuitValidationSchema };

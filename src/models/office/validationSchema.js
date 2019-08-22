const Joi = require('joi');
const validator = require('validator');

const officeValidationSchema = {
  officeValidation: Joi.object().keys({
    type: Joi.string().required(),

    name: Joi.string().required(),

    address: Joi.array().items(
      Joi.object().keys({
        street: Joi.string(),
        complement: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        zipCode: Joi.string(),
      }),
    ),

    phones: Joi.array().items(
      Joi.object().keys({
        type: Joi.string(),
        number: Joi.string(),
      }),
    ),

    email: Joi.array().items(
      Joi.object().keys({
        type: Joi.string(),
        address: Joi.string().email({ minDomainSegments: 2 }),
      }),
    ),

    modifiedBy: Joi.string(),
  }),
};

module.exports = { officeValidationSchema };

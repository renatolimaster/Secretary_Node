const Joi = require('joi');

const congregationValidationCongregationSchema = {
  congregationValidation: Joi.object().keys({
    number: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.array().items(
      Joi.object().keys({
        street: Joi.string(),
        complement: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
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
        address: Joi.string()
          .email()
          .lowercase()
          .required(),
      }),
    ),
    circuitId: Joi.string(),
    coordinatorId: Joi.string(),
    modifiedBy: Joi.string(),
    default: Joi.boolean().required(),
  }),
};

module.exports = { congregationValidationCongregationSchema };

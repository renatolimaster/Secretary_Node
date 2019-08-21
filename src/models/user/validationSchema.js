// we use a reference to the password key on confirmPassword
// to always ensure that password and confirmPassword are exactly the same
const Joi = require('joi');

const userValidationSchema = {
  userValidation: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    roleId: Joi.string().required(),
    publishersId: Joi.string()
      .allow('', null)
      .default(null),
    tokens: Joi.string().token(),
    password: Joi.string()
      .alphanum()
      .min(7)
      .required()
      .strict(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .strict(),
  }),
};

module.exports = { userValidationSchema };

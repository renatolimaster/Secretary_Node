const Joi = require('joi');

const publisherValidationSchema = {
  publisherValidation: Joi.object().keys({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.strict(),
    gender: Joi.string().valid('Male', 'Female'),
    baptized: Joi.bool(),
    address: Joi.array().items(
      Joi.object().keys({
        street: Joi.string(),
        complement: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
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
    householder: Joi.bool().default(false),
    birthDate: Joi.date()
      .less(Joi.ref('baptismDate'))
      .optional(),
    baptismDate: Joi.date()
      .greater(Joi.ref('birthDate'))
      .optional(),
    servantDate: Joi.date()
      .less(Joi.ref('elderDate'))
      .allow('')
      .optional(),
    elderDate: Joi.date()
      .greater(Joi.ref('servantDate'))
      .allow('')
      .optional(),
    inactivityDate: Joi.date()
      .allow('')
      .optional(),
    reactivationDate: Joi.date()
      .allow('')
      .optional(),
    firstFieldService: Joi.date()
      .greater(Joi.ref('birthDate'))
      .optional(),
    startPioneer: Joi.date()
      .greater(Joi.ref('baptismDate'))
      .allow('')
      .optional(),
    userId: Joi.string().allow(null),
    notes: Joi.string(),
    statusService: Joi.string().valid('Regular', 'Irregular', 'Inactive'),
    statusAssociation: Joi.string().valid('Student', 'Student Publisher', 'Associated', 'Dissociated', 'Disfellowshipped', 'Deceased'),
    servicePrivilege: Joi.string().valid('Elder', 'Ministerial Servant', 'Superintendent of Service', 'Publisher', 'Student'),
    congregationalPrivilege: Joi.string(),
    groupId: Joi.string(),
    pioneerId: Joi.string(),
    pioneerNumber: Joi.string().allow(''),
    profile: Joi.string(),
    congregationId: Joi.string(),
    modifiedBy: Joi.string(),
  }),
};

module.exports = { publisherValidationSchema };

const Joi = require('joi');

const validationPublisherSchema = {
  publisherValidation: Joi.object().keys({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.strict(),
    gender: Joi.string().valid('Male', 'Female'),
    baptized: Joi.bool(),
    address: Joi.object().keys({
      street: Joi.string(),
      complement: Joi.string(),
      neighborhood: Joi.string(),
      city: Joi.string(),
      zipCode: Joi.string(),
    }),
    phones: Joi.object().keys({
      type: Joi.string(),
      number: Joi.string(),
    }),
    email: Joi.object().keys({
      type: Joi.string(),
      address: Joi.string().email({ minDomainSegments: 2 }),
    }),
    householder: Joi.bool(),
    birthDate: Joi.date().less(Joi.ref('baptismDate')),
    baptismDate: Joi.date().less(Joi.ref('servantDate')),
    servantDate: Joi.date().less(Joi.ref('elderDate')),
    elderDate: Joi.date().greater(Joi.ref('servantDate')),
    inactivityDate: Joi.date(),
    reactivationDate: Joi.date(),
    firstFieldService: Joi.date().greater(Joi.ref('birthDate')),
    notes: Joi.string(),
    startPioneer: Joi.date().greater(Joi.ref('baptismDate')),
    statusService: Joi.string().valid('Regular', 'Irregular', 'Inactive'),
    statusAssociation: Joi.string().valid('Student', 'Student Publisher', 'Associated', 'Dissociated', 'Disfellowshipped', 'Deceased'),
    servicePrivilege: Joi.string().valid('Elder', 'Ministerial Servant', 'Superintendent of Service', 'Publisher', 'Student'),
    congregationalPrivilege: Joi.string(),
    groupId: Joi.string(),
    pioneerId: Joi.string(),
    pioneerNumber: Joi.string(),
    profile: Joi.string(),
    congregationId: Joi.string(),
    modifiedBy: Joi.string(),
  }),
};

module.exports = { validationPublisherSchema };

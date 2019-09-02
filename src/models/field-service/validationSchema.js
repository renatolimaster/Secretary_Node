const Joi = require('@hapi/joi');

const fieldserviceValidationSchema = {
  fieldserviceValidation: Joi.object().keys({
    referenceDate: Joi.date(),
    referenceYear: Joi.number(),
    referenceMonth: Joi.number().integer().min(1).max(12),
    deliveryDate: Joi.date(),
    videos: Joi.number(),
    returnVisits: Joi.number(),
    studies: Joi.number(),
    books: Joi.number(),
    brochures: Joi.number(),
    magazines: Joi.number(),
    weblinks: Joi.number(),
    campaignTracts: Joi.number(),
    tracts: Joi.number(),
    handbills: Joi.number(),
    otherpublications: Joi.number(),
    hours: Joi.number(),
    hoursBetel: Joi.number(),
    creditHours: Joi.number(),
    minutes: Joi.number().integer().min(0).max(59),
    notes: Joi.string(),
    placements: Joi.number(),
    pioneerId: Joi.string(),
    publisherId: Joi.string(),
  }),
};

module.exports = { fieldserviceValidationSchema };

const Joi = require('@hapi/joi');

const fieldserviceValidationSchema = {
  fieldserviceValidation: Joi.object().keys({
    referenceDate: Joi.date(),
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
    cards: Joi.number(),
    otherpublications: Joi.number(),
    hours: Joi.number(),
    hoursBetel: Joi.number(),
    creditHours: Joi.number(),
    minutes: Joi.number()
      .integer()
      .min(0)
      .max(59),
    notes: Joi.string(),
    placements: Joi.number(),
    pioneerId: Joi.string().allow(null),
    publisherId: Joi.string().allow(null),
    congregationId: Joi.string().allow(null),
  }),
};

module.exports = { fieldserviceValidationSchema };

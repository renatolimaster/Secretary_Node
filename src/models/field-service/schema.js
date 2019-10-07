const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');

const fieldServiceSchema = new Schema(
  {
    referenceDate: {
      type: Date,
      required: true,
    },
    referenceYear: {
      type: Number,
      required: true,
    },
    referenceMonth: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    videos: {
      type: Number,
    },
    returnVisits: {
      type: Number,
    },
    studies: {
      type: Number,
      required: true,
    },
    books: {
      type: Number,
    },
    brochures: {
      type: Number,
    },
    magazines: {
      type: Number,
    },
    weblinks: {
      type: Number,
    },
    campaignTracts: {
      type: Number,
    },
    tracts: {
      type: Number,
    },
    cards: {
      type: Number,
    },
    otherpublications: {
      type: Number,
    },
    hours: {
      type: Number,
    },
    hoursBetel: {
      type: Number,
    },
    creditHours: {
      type: Number,
    },
    minutes: {
      type: Number,
    },
    notes: {
      type: String,
    },
    placements: {
      type: Number,
    },
    pioneerId: {
      type: ObjectId,
      ref: 'pioneers',
    },
    publisherId: {
      type: ObjectId,
      ref: 'publishers',
    },
    // stored for each congregation to which the publisher belonged
    congregationId: {
      type: ObjectId,
      ref: 'congregations',
    },
  },
  {
    timestamps: true,
  },
);

fieldServiceSchema.plugin(mongoosePaginate);

// link to field services
fieldServiceSchema.virtual('publisher', {
  ref: 'publishers',
  localField: '_id',
  foreignField: 'publisherId',
  options: {
    sort: {
      referenceDate: 'desc',
    },
  },
});

fieldServiceSchema.virtual('totalHoursService').get(function() {
  return this.hours + this.hoursBetel + this.creditHours;
});

module.exports = {
  fieldServiceSchema,
};

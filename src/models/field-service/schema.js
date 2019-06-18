const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const fieldServiceSchema = new Schema({

  referenceDate: {
    type: Date,
    required: true
  },
  referenceYear: {
    type: Number,
    required: true
  },
  referenceMonth: {
    type: Number,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  studies: {
    type: Number,
    required: true
  },
  brochures: {
    type: Number
  },
  hours: {
    type: Number
  },
  hoursBetel: {
    type: Number
  },
  creditHours: {
    type: Number
  },
  books: {
    type: Number
  },
  minutes: {
    type: Number
  },
  notes: {
    type: String
  },
  returnVisits: {
    type: Number
  },
  magazines: {
    type: Number
  },
  collocations: {
    type: Number
  },
  videos: {
    type: Number
  },
  pioneerId: {
    type: ObjectId,
    ref: 'pioneers'
  },
  publisherId: {
    type: ObjectId,
    ref: 'publishers'
  },
}, {
  timestamps: true
});

// link to field services
fieldServiceSchema.virtual('publisher', {
  ref: 'publishers',
  localField: '_id',
  foreignField: 'publisherId',
  options: {
    sort: {
      referenceDate: 'desc'
    }
  }
});

fieldServiceSchema.virtual('totalHoursService').get(function () {
  return this.hours + this.hoursBetel + this.creditHours;
});

module.exports = {
  fieldServiceSchema
};
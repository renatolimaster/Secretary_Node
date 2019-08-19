const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const validator = require('validator');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// ** CONGREGATION SCHEMA ** //
const officeSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Headquarter', 'Branch'],
      required: true,
    },
    address: [
      {
        street: {
          type: String,
        },
        complement: {
          type: String,
          required: false,
        },
        neighborhood: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: { type: String, required: false },
        country: { type: String, required: false },
        zipCode: {
          type: String,
          required: false,
        },
      },
    ],
    phones: [
      {
        type: {
          type: String,
        },
        number: {
          type: String,
        },
      },
    ],
    email: [
      {
        type: {
          type: String,
        },
        address: {
          type: String,
          unique: true, // must to restart mongodb to works
          required: [true, 'E-mail is required.'],
          trim: true,
          lowercase: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error('Email is invalid');
            }
          },
        },
      },
    ],
    modifiedBy: {
      type: ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

officeSchema.plugin(mongoosePaginate);
/*
used to maintain a relationship with publishers model
its means that congregation has many publishers
*/
officeSchema.virtual('congregations', {
  ref: 'congregations',
  localField: '_id',
  foreignField: 'officeId',
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  // One to Many: justOne = false
  // One to One: justOne = true
  justOne: false,
});

module.exports = { officeSchema };

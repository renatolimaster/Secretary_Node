const mongoose = require('mongoose');
const moment = require('moment');
const validator = require('validator');
//
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const decimal = Schema.Types.Decimal128;
//
const date = moment();
// const year = moment('YYYY');
// const month = moment('MM');

/* Publisher publisherSchema */
const publisherSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female']
    },
    baptized: {
      type: Boolean,
      default: false
    },
    address: [
      {
        street: { type: String },
        complement: { type: String, required: false },
        neighborhood: { type: String, required: false },
        city: { type: String, required: false },
        zipCode: { type: String, required: false }
      }
    ],
    phones: [
      {
        kind: { type: String },
        number: { type: String }
      }
    ],
    email: [
      {
        kind: { type: String },
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
          }
        }
      }
    ],
    birthDate: {
      type: Date,
      default: date
    },
    baptismDate: {
      type: Date,
      default: date
    },
    householder: {
      type: Boolean,
      default: false
    },
    elderDate: {
      type: Date
    },
    servantDate: {
      type: Date
    },
    inactivityDate: {
      type: Date
    },
    reactivationDate: {
      type: Date
    },
    firstFieldService: {
      type: Date
    },
    notes: {
      type: String
    },
    startPioneer: {
      type: Date
    },
    statusService: {
      type: String,
      enum: ['Regular', 'Irregular'],
      required: true
    },
    statusAssociation: {
      type: String,
      enum: [
        'Student',
        'Student Publisher',
        'Associated',
        'Decoupled',
        'Deceased'
      ],
      required: true
    },
    servicePrivilege: {
      type: String,
      enum: [
        'Elder',
        'Ministerial Servant',
        'Superintendent of Service',
        'Publisher'
      ],
      required: true
    },
    groupId: {
      type: ObjectId,
      ref: 'group'
    },
    pioneerId: {
      type: ObjectId,
      ref: 'pioneer'
    },
    pioneerNumber: {
      type: String
    },
    profile: {
      type: ObjectId,
      ref: 'profiles'
    },
    /*
    used to maintain a one to one relationship with Users
    one publisher has one user
    */
    userId: {
      type: ObjectId,
      ref: 'users',
      justOne: true
    },
    /*
    used to maintain a one to many relationship with congregations
    publishers (child) belongs to congregations (owner)
    */
    congregationId: {
      type: ObjectId,
      ref: 'congregations' // must to be the same name in model object
    },
    modifiedBy: {
      type: ObjectId,
      ref: 'publishers'
    }
  },
  { timestamps: true }
);

module.exports = { publisherSchema };

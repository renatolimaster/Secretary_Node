const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate-v2');
const validator = require('validator');
//
const { congregationalPrivilegeSchema } = require('../congregational-privilege/schema');
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
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    baptized: {
      type: Boolean,
      default: false,
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
    birthDate: {
      type: Date,
      default: date,
    },
    baptismDate: {
      type: Date,
      default: date,
    },
    householder: {
      type: Boolean,
      default: false,
    },
    elderDate: {
      type: Date,
    },
    servantDate: {
      type: Date,
    },
    inactivityDate: {
      type: Date,
    },
    reactivationDate: {
      type: Date,
    },
    firstFieldService: {
      type: Date,
    },
    notes: {
      type: String,
    },
    startPioneer: {
      type: Date,
    },
    statusService: {
      type: String,
      enum: ['Regular', 'Irregular', 'Inactive'],
      required: true,
    },
    statusAssociation: {
      type: String,
      enum: ['Student', 'Student Publisher', 'Associated', 'Dissociated', 'Disfellowshipped', 'Deceased'],
      required: true,
    },
    servicePrivilege: {
      type: String,
      enum: ['Overseer', 'Elder', 'Servant', 'Publisher', 'Student'],
      required: true,
    },
    // congregationalPrivilege: [congregationalPrivilegeSchema],
    congregationalPrivilege: [
      {
        type: ObjectId,
        ref: 'congregationalprivileges',
        unique: true,
      },
    ],
    groupId: {
      type: ObjectId,
      ref: 'groups',
    },
    pioneerId: {
      type: ObjectId,
      ref: 'pioneers',
    },
    pioneerNumber: {
      type: String,
    },
    profile: {
      type: ObjectId,
      ref: 'profiles',
    },
    /*
  used to maintain a one to one relationship with Users
  one publisher has one user
  */
    userId: {
      type: ObjectId,
      ref: 'users',
      justOne: true,
    },
    /*
  used to maintain a one to many relationship with congregations
  publishers (child) belongs to congregations (owner)
  */
    congregationId: {
      type: ObjectId,
      ref: 'congregations', // must to be the same name in model object
    },
    modifiedBy: {
      type: ObjectId,
      ref: 'publishers',
    },
  },
  {
    timestamps: true,
  },
);

publisherSchema.plugin(mongoosePaginate);

publisherSchema.virtual('fieldServices', {
  ref: 'fieldservices', // The model to use - the name of the table on database
  localField: '_id', // `localField` here
  foreignField: 'publisherId', // is equal to `foreignField` in the focused table
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: {
    sort: {
      referenceDate: 'desc',
    },
    limit: 12,
  }, // Query options, see http://bit.ly/mongoose-query-options
});

publisherSchema.virtual('firstLastName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

publisherSchema.virtual('lastFirstName').get(function() {
  return this.lastName + ', ' + this.firstName;
});

module.exports = {
  publisherSchema,
};

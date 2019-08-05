const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
//
const validator = require('validator');

/* User userSchema */
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, // must to restart mongodb to works
      required: [true, 'User name is required.'],
      trim: true,
    },
    email: {
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
      required: true,
    },
    bindingCode: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contains invalid character');
        }
      },
    },
    /*
  used to maintain a one to one relationship
  one user has one role
  */
    roleId: {
      type: ObjectId,
      ref: 'roles',
      justOne: true,
    },
    /*
  used to maintain a one to one relationship
  one user has one publisher
  */
    publishersId: {
      type: ObjectId,
      ref: 'publishers',
      justOne: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(mongoosePaginate);

module.exports = {
  userSchema,
};

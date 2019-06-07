const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new Schema({
  local: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    street: {
      type: String
    },
    complement: {
      type: String,
      required: false
    },
    neighborhood: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    zipCode: {
      type: String,
      required: false
    }
  },
  helperId: {
    type: ObjectId,
    ref: 'publishers'
  },
  overseerId: {
    type: ObjectId,
    ref: 'publishers'
  },
  congregationId: {
    type: ObjectId,
    ref: 'congregations'
  },
  modifiedBy: {
    type: ObjectId,
    ref: 'publishers',
    required: true
  }
}, {
  timestamps: true
});

module.exports = {
  groupSchema
};
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const pioneerSchema = new Schema(
  {
    description: {
      type: String,
      enum: ['None', 'Auxiliary 30 hours', 'Auxiliary Pioneer', 'Regular Auxiliary Pioneer', 'Regular Pioneer', 'Especial Pioneer', 'Missionary'],
      require: true,
    },
    requirement: {
      type: String,
    },
    congregationId: {
      type: ObjectId,
      ref: 'congregations',
    },
    modifiedBy: {
      type: ObjectId,
      ref: 'users',
    },
  },
  {
    timestamp: true,
  },
);

module.exports = {
    pioneerSchema
};
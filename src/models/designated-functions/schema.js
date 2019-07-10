const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DesignatedFunctionSchema = new Schema(
  {
    description: { type: String, required: true },
    modifiedBy: {
      type: ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

module.exports = { DesignatedFunctionSchema };

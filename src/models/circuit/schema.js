const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const validator = require('validator');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const circuitSchema = new Schema(
  {
    number: { type: String, required: true, unique: true },
    notes: { type: String, required: false },
    officeId: { type: ObjectId, ref: 'offices' },
    overseerId: { type: ObjectId, ref: 'publishers' },
    modifiedBy: {
      type: ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

circuitSchema.plugin(mongoosePaginate);

circuitSchema.virtual('congregations', {
  ref: 'congregations', // The model to use - the name of the table on database
  localField: '_id', // `localField` here
  foreignField: 'circuitId', // is equal to `foreignField` in the focused table
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

module.exports = { circuitSchema };

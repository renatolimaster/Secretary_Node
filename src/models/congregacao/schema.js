const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// ** CONGREGATION SCHEMA ** //
const congregationSchema = new Schema(
  {
    number: {
      type: String,
      required: true
    },
    name: {
      type: String,
      unique: true, // must to restart mongodb to works
      required: [true, 'Name is required']
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
        address: { type: String }
      }
    ],
    coordenatorId: {
      type: ObjectId,
      ref: 'publishers'
    },
    default: {
      type: Boolean,
      required: false,
      default: false
    },
    modifiedBy: {
      type: ObjectId,
      ref: 'publishers'
    }
  },
  { timestamps: true }
);

/*
used to maintain a relationship with publicadores model
its means that congregation has many publicadores
*/
congregationSchema.virtual('publishers', {
  ref: 'publishers',
  localField: '_id',
  foreignField: 'congregationId',
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  // One to Many: justOne = false
  // One to One: justOne = true
  justOne: false
});

module.exports = { congregationSchema };

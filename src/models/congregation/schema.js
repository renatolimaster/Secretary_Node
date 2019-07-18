const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// ** CONGREGATION SCHEMA ** //
const congregationSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true
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
        state: { type: String,  required: false},
        zipCode: { type: String, required: false }
      }
    ],
    phones: [
      {
        type: { type: String },
        number: { type: String }
      }
    ],
    email: [
      {
        type: { type: String },
        address: { type: String }
      }
    ],
    coordinatorId: {
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
      ref: 'users'
    }
  },
  { timestamps: true }
);

congregationSchema.plugin(mongoosePaginate);

/*
used to maintain a relationship with publishers model
its means that congregation has many publishers
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

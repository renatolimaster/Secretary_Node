const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const roleSchema = new Schema({
  role: {
    type: String,
    enum: ['Admin', 'Overseer', 'Elder', 'Servant', 'Pioneer', 'Accounts', 'Publisher', 'Student'],
    required: true,
  },
  model: [
    {
      name: { type: String, required: true },
      action: [{ type: String, required: true }],
    },
  ],
});


roleSchema.plugin(mongoosePaginate);

/*
used to maintain a relationship with publishers model
its means that congregation has many publishers
*/
roleSchema.virtual('users', {
  ref: 'users',
  localField: '_id',
  foreignField: 'roleId',
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  // One to Many: justOne = false
  // One to One: justOne = true
  justOne: false,
});

module.exports = { roleSchema };

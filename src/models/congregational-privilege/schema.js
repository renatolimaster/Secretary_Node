const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const congregationalPrivilegeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  modifiedBy: {
    type: ObjectId,
    ref: 'publishers'
  },
  congregationId: {
    type: ObjectId,
    ref: 'congregations',
    required: true
  }
}, {
  timestamps: true
});

// Specifying a virtual with a `ref` property is how you enable virtual
// population
congregationalPrivilegeSchema.virtual('publishers', {
  ref: 'publishers',
  localField: '_id',
  foreignField: 'congregationalPrivilege',
  options: {
    sort: {
      firstName: 'asc'
    }
  } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = {
  congregationalPrivilegeSchema
};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const congregationalPrivilegeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

module.exports = {
  congregationalPrivilegeSchema
};
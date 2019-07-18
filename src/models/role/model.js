const mongoose = require('mongoose');
const { roleSchema } = require('./schema');

roleSchema.pre('save', function(next) {
  console.log('roleSchema pre save');
  next();
});

const Role = mongoose.model('roles', roleSchema);

module.exports = { Role };

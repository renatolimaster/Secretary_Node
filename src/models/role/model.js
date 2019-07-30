const mongoose = require('mongoose');
const { roleSchema } = require('./schema');

roleSchema.pre('save', function(next) {
  console.log('roleSchema pre save');
  next();
});

/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to ommit any attibute use delete
followed of object attribute name
*/
roleSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const role = this;
  const roleObject = role.toObject();

  // delete userObject.id;

  return roleObject;
};

// must be set to populate to be filled
roleSchema.set('toObject', { virtuals: true });
roleSchema.set('toJSON', { virtuals: true });

const Role = mongoose.model('roles', roleSchema);

module.exports = { Role };

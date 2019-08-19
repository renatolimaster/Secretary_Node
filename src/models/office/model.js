const mongoose = require('mongoose');
const { officeSchema } = require('./schema');

officeSchema.pre('save', function(next) {
  console.log('officeSchema pre save');
  next();
});

/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to omit any attribute use delete
followed of object attribute name
*/
officeSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const office = this;
  const officeObject = office.toObject();

  // delete officeObject.number;

  return officeObject;
};

// must be set to populate to be filled
officeSchema.set('toObject', { virtuals: true });
officeSchema.set('toJSON', { virtuals: true });

const Office = mongoose.model('offices', officeSchema); // the name will put on plural by mongo

module.exports = {
  Office,
};

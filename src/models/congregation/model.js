const mongoose = require('mongoose');
const { congregationSchema } = require('./schema');

congregationSchema.pre('save', function(next) {
  console.log('congregationSchema pre save');
  // console.log('this:', this);
  next();
});

/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to ommit any attibute use delete
followed of object attribute name
*/
congregationSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const congregation = this;
  const congregationObject = congregation.toObject();

  // delete userObject.id;

  return congregationObject;
};

/* the model name will put on plural by mongo and
   must be used in relationship with others models
*/
const Congregation = mongoose.model('congregations', congregationSchema);

module.exports = { Congregation };

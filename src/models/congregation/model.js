const mongoose = require('mongoose');
const { congregationSchema } = require('./schema');
const log = console.log;
congregationSchema.pre('save', function(next) {
  log('congregationSchema pre save');
  // console.log('this:', this);
  next();
});

congregationSchema.statics.findByCircuit = async circuitId => {
  log('=============== Circuit findByCongregation =================');
  const congregation = await Congregation.findOne({ circuitId });
  log(congregation);
  if (congregation) {
    return congregation;
  }

  return false;
};

/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to omit any attribute use delete
followed of object attribute name
*/
congregationSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const congregation = this;
  const congregationObject = congregation.toObject();

  delete congregationObject.number;

  return congregationObject;
};

// must be set to populate to be filled
congregationSchema.set('toObject', { virtuals: true });
congregationSchema.set('toJSON', { virtuals: true });

congregationSchema.statics.findDuplicate = async (number, name) => {
  console.log('============== Congregation findDuplicate ===================');
  const congregation = await Congregation.findOne({ number, name });

  if (congregation) {
    return true;
  }

  return false;
};

/* the model name will put on plural by mongo and
   must be used in relationship with others models
*/
const Congregation = mongoose.model('congregations', congregationSchema);

module.exports = { Congregation };

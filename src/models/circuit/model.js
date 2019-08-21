const mongoose = require('mongoose');
const { circuitSchema } = require('./schema');

circuitSchema.pre('save', function(next) {
  console.log('circuitSchema pre save');
  next();
});

circuitSchema.statics.findById = async _id => {
  console.log('=============== Circuit findByCongregation =================');
  const circuit = await Circuit.findOne({ _id })
    .populate('officeId')
    .populate('overseerId');

  if (circuit) {
    return circuit;
  }

  return false;
};

circuitSchema.statics.findByNumberAndOffice = async (number, officeId) => {
  console.log('=============== Circuit findByCongregation =================');
  const circuit = await Circuit.findOne({ number, officeId })
    .populate('officeId')
    .populate('overseerId');

  if (circuit) {
    return circuit;
  }

  return false;
};

/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to omit any attribute use delete
followed of object attribute name
*/
circuitSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const circuit = this;
  const circuitObject = circuit.toObject();

  // delete circuit.number;

  return circuitObject;
};

// must be set to populate to be filled
circuitSchema.set('toObject', { virtuals: true });
circuitSchema.set('toJSON', { virtuals: true });

/* the model name will put on plural by mongo and
   must be used in relationship with others models
*/
const Circuit = mongoose.model('circuits', circuitSchema);

module.exports = { Circuit };

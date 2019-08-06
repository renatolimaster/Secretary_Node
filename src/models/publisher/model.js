const mongoose = require('mongoose');
const { publisherSchema } = require('./schema');

publisherSchema.pre('save', function(next) {
  console.log('publisherSchema pre save');
  next();
});

publisherSchema.pre('remove', function(next) {
  console.log('publisherSchema pre remove');
  const PublisherDesignatedFunction = mongoose.model('publisherdesignatedfunctions');
  PublisherDesignatedFunction.deleteMany({ publisherId: { $in: this._id } }).then(() => next());
});


/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to ommit any attibute use delete
followed of object attribute name
*/
publisherSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const role = this;
  const roleObject = role.toObject();

  // delete userObject.id;

  return roleObject;
};

const Publisher = mongoose.model('publishers', publisherSchema); // the name will put on plural by mongo

module.exports = {
  Publisher,
};

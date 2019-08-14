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

publisherSchema.statics.findByCongregation = async congregationId => {
  console.log('=============== Publisher findByCongregation =================');
  const publishers = await Publisher.findOne({ congregationId });

  if (publishers) {
    return true;
  }

  return false;
};

publisherSchema.statics.findByIdAndCongregation = async (_id, congregationId) => {
  console.log('=============== Publisher findByIdAndCongregation =================');
  const publishers = await Publisher.findOne({ _id, congregationId });
  console.log(publishers);
  if (publishers) {
    return publishers;
  }

  return false;
};

publisherSchema.statics.findDuplicate = async ({ firstName, middleName, lastName, congregationId }) => {
  console.log('=============== Publisher findDuplicate =================');
  const publisher = await Publisher.findOne({ firstName, middleName, lastName, congregationId });
  console.log('publisher:', publisher);
  if (publisher) {
    return true;
  }

  return false;
};

/* when methods are created using toJSON
it automatic return the object as JSON.
If you want to omit any attribute use delete
followed of object attribute name
*/
publisherSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const role = this;
  const roleObject = role.toObject();
  console.log('======= JSON ==========');

  // delete roleObject.id;

  return roleObject;
};

const Publisher = mongoose.model('publishers', publisherSchema); // the name will put on plural by mongo

module.exports = {
  Publisher,
};

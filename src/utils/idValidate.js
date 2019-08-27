const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const idValidate = async _id => {
  log('=============> idValidate <===================');
  const idIsValid = await ObjectId.isValid(_id);
  if (idIsValid) {
    return true;
  }
  return false;
};

module.exports = idValidate ;

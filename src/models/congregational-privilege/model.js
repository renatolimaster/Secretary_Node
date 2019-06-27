const mongoose = require('mongoose');
const {
  congregationalPrivilegeSchema
} = require('./schema');

congregationalPrivilegeSchema.pre('save', function (next) {
  console.log('congregationalPrivilegeSchema pre save');
  // console.log('this:', this);
  next();
});

congregationalPrivilegeSchema.toJSON = function () {
  /* methods access instances of object, because that I am using this bellow */
  const congregationalPrivilege = this;
  const congregationalPrivilegeObject = congregationalPrivilege.toObject();

  // delete userObject.id;

  return congregationalPrivilegeObject;
};

const CongregationalPrivilege = mongoose.model('congregationalprivileges', congregationalPrivilegeSchema);

module.exports = {
  CongregationalPrivilege
};
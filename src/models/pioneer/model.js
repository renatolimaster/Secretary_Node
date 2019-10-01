const mongoose = require('mongoose');
const { pioneerSchema } = require('./schema');
const log = console.log;
pioneerSchema.pre('save', function(next) {
  console.log('pioneerSchema pre save');
  next();
});

pioneerSchema.statics.findById = async _id => {
  log('=============== Pioneer findById =================');
  const pioneer = await Pioneer.findOne({ _id });

  if (pioneer) {
    return pioneer;
  }

  return false;
};

pioneerSchema.statics.findByDescriptionCongregationId = async (description, congregationId) => {
  log('=============== Pioneer findByDescriptionCongregationId =================');
  const pioneer = await Pioneer.findOne({ description, congregationId });
  log('pioneer', pioneer);
  if (pioneer) {
    return pioneer;
  }

  return false;
};

const Pioneer = mongoose.model('pioneers', pioneerSchema);

module.exports = {
  Pioneer,
};

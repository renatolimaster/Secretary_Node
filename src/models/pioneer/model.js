const mongoose = require('mongoose');
const {
    pioneerSchema
} = require('./schema');

pioneerSchema.pre('save', function (next) {
    console.log('pioneerSchema pre save');
    next();
});

const Pioneer = mongoose.model('pioneers', pioneerSchema);

module.exports = {
    Pioneer
};
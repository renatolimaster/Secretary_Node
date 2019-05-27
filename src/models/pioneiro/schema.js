const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const pioneerSchema = new Schema({
    description: {
        type: String,
        require: true
    },
    requirement: {
        type: String
    },
    congregationId: {
        type: ObjectId,
        ref: 'congregations'
    },
    modifiedBy: {
        type: ObjectId,
        ref: 'publishers'
    }
}, {
    timestamp: true
});

module.exports = {
    pioneerSchema
};
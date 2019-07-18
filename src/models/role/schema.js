const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const roleSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'uses',
  },
  role: {
    type: String,
    required: true,
  },
  model: [
    {
      name: { type: String, required: true },
      action: [{ type: String, required: true }],
    },
  ],
});

module.exports = { roleSchema };

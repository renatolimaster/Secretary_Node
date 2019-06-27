const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PublisherDesignatedFunctionSchema = new Schema({
  permission: {
    type: String,
    enum: ["Read", "ReadWrite", "Delete"],
    required: true,
  },
  publisherId: [
    {
      type: ObjectId,
      ref: "publishers",
    },
  ],
  designatedFunctionId: [
    {
      type: ObjectId,
      ref: "designatedfunctions",
    },
  ],
});

module.exports = { PublisherDesignatedFunctionSchema };

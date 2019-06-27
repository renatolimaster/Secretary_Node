const mongoose = require("mongoose");
const { PublisherDesignatedFunctionSchema } = require("./schema");

PublisherDesignatedFunctionSchema.pre("save", function(next) {
  console.log("======== PublisherDesignatedFunctionSchema save =========");
  next();
});

const PublisherDesignatedFunction = mongoose.model("publisherdesignatedfunctions", PublisherDesignatedFunctionSchema);

module.exports = { PublisherDesignatedFunction };

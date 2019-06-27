const mongoose = require("mongoose");
const { DesignatedFunctionSchema } = require("./schema");

DesignatedFunctionSchema.pre("save", function(next) {
  console.log("================ DesignatedFunctionsSchema save ===================");
  next();
});

const DesignatedFunction = mongoose.model("designatedfunctions", DesignatedFunctionSchema);

module.exports = { DesignatedFunction };

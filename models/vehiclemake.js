const mongoose = require("mongoose");
const Joi = require("joi");

const vehiclemakeSchema = new mongoose.Schema({
  make: {
    type: Array,
    lowercase: true
  }
});


const VehicleMake = mongoose.model("VehicleMake", vehiclemakeSchema);

function validateVehicleMake(vehiclemake) {
  const schema = {
    make: Joi.Array().required()
  };
  return Joi.validate(vehiclemake, schema);
}

module.exports = {
    VehicleMake,
  validateVehicleMake,
};

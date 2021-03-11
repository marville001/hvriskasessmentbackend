const mongoose = require("mongoose");
const Joi = require("joi");

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    minlength: 6,
    maxlength: 50,
  },
  sessionid: {
    type: String,
    required: true,
    maxlength: 50,
  },
  model: {
    type: String,
    minlength: 6,
    maxlength: 255,
  },
  year: {
    type: String,
    maxlength: 255,
  },
  vin: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  lpstate: {
    type: String,
    maxlength: 1024,
  },
  licence: {
    type: String,
    required: true,
    maxlength: 1024,
  },
});


const Vehicle = mongoose.model("Vehicle", vehicleSchema);

function validateVehicle(vehicle) {
  const schema = {
    licence: Joi.string().min(5).max(50).required(),
    sessionid: Joi.string().min(5).max(50).required(),
    vin: Joi.string().min(5).max(50).required(),
    make: Joi.string().max(255),
    model: Joi.string().max(255),
    year: Joi.string().max(255),
    lpstate: Joi.string().max(1024),
  };
  return Joi.validate(vehicle, schema);
}

module.exports = {
  Vehicle,
  validateVehicle,
};

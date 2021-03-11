const mongoose = require("mongoose");
const Joi = require("joi");

const callerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  organization: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  location: {
    type: String,
    maxlength: 1024,
  },
  supervisor: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  organization_address: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  organization_number: {
    type: String,
    required: true,
    maxlength: 1024,
  },
});


const Caller = mongoose.model("Caller", callerSchema);

function validateCaller(caller) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    number: Joi.string().max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    supervisor: Joi.string().max(255).required(),
    organization_address: Joi.string().max(1024).required(),
    organization_number: Joi.string().max(1024).required(),
    location: Joi.string().max(255),
    organization: Joi.string().max(255).required(),
  };
  return Joi.validate(caller, schema);
}

module.exports = {
  Caller,
  validateCaller,
};

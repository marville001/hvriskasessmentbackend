const mongoose = require("mongoose");
const Joi = require("joi");

const callerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 6,
    maxlength: 50,
  },
  sessionid: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 255,
  },
  number: {
    type: String,
    maxlength: 255,
  },
  organization: {
    type: String,
    maxlength: 1024,
  },
  location: {
    type: String,
    maxlength: 1024,
  },
  supervisor: {
    type: String,
    maxlength: 1024,
  },
  organization_address: {
    type: String,
    maxlength: 1024,
  },
  organization_number: {
    type: String,
    maxlength: 1024,
  },
});

const Caller = mongoose.model("Caller", callerSchema);

function validateCaller(caller) {
  const schema = {
    name: Joi.string().min(5).max(50),
    sessionid: Joi.string().min(5).max(50),
    number: Joi.string().max(255),
    email: Joi.string().min(6).max(255).email(),
    supervisor: Joi.string().max(255),
    organization_address: Joi.string().max(1024),
    organization_number: Joi.string().max(1024),
    location: Joi.string().max(255),
    organization: Joi.string().max(255),
  };
  return Joi.validate(caller, schema);
}

module.exports = {
  Caller,
  validateCaller,
};

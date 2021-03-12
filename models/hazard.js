const mongoose = require("mongoose");
const Joi = require("joi");

const hazardSchema = new mongoose.Schema({
  onfire: {
    type: Boolean
  },
  smoking: {
    type: Boolean
  },
  anysound: {
    type: Boolean
  },
  anysmell: {
    type: Boolean
  },
  electricshutdown:{
      type: Boolean
  },
  shutdown:{
    type: String,
    lowercase: true
  },
  sessionid: {
    type: String,
    required: true
  },
  quiz: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    lowercase: true
  }
});

const Hazard = mongoose.model("Hazard", hazardSchema);

function validateHazard(hazard) {
  const schema = {
    onfire: Joi.Boolean(),
    smoking: Joi.Boolean(),
    anysound: Joi.Boolean(),
    anysmell: Joi.Boolean(),
    electricshutdown: Joi.Boolean(),
    shutdown: Joi.string(),
    sessionid: Joi.string().required(),
    quiz: Joi.number().required(),
    level: Joi.String(),
  };
  return Joi.validate(hazard, schema);
}

module.exports = {
    Hazard,
    validateHazard: validateHazard,
};

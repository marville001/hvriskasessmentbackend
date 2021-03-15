const mongoose = require("mongoose");
const Joi = require("joi");

const vdamageSchema = new mongoose.Schema({
  position: {
    type: String,
    default: undefined,
  },
  damaged: {
    type: Boolean,
    default: undefined,
  },
  submerged: {
    type: Boolean,
    default: undefined,
  },
  bareaflooded: {
    type: Boolean,
    default: undefined,
  },
  onfire: {
    type: Boolean,
    default: undefined,
  },
  severity: {
    type: String,
    default: undefined,
  },
  airbagdeploys: {
    type: Boolean,
    default: undefined,
  },
  whichairbag: {
    type: String,
    default: undefined,
  },
  anypartofhvexposed: {
    type: Boolean,
    lowercase: true,
  },
  sessionid: {
    type: String,
    required: true,
  },
  quiz: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    lowercase: true,
  },
  notes: {
    type: Array,
    lowercase: true,
  },
});

const Vdamage = mongoose.model("Vdamage", vdamageSchema);

function validateVdamage(vdamage) {
  const schema = {
    position: Joi.String(),
    damaged: Joi.Boolean(),
    submerged: Joi.Boolean(),
    bareaflooded: Joi.Boolean(),
    onfire: Joi.Boolean(),
    severity: Joi.string(),
    whichairbag: Joi.string(),
    anypartofhvexposed: Joi.string(),
    airbagdeploys: Joi.Boolean(),
    sessionid: Joi.number().required(),
    quiz: Joi.number().required(),
    level: Joi.String(),
  };
  return Joi.validate(vdamage, schema);
}

module.exports = {
  Vdamage,
  validateVdamage: validateVdamage,
};

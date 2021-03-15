const mongoose = require("mongoose");
const Joi = require("joi");

const vdamageSchema = new mongoose.Schema({
  position: {
    type: String,
    default: null,
  },
  damaged: {
    type: String,
    default: null,
  },
  submerged: {
    type: Boolean,
    default: null,
  },
  bareaflooded: {
    type: Boolean,
    default: null,
  },
  onfire: {
    type: Boolean,
    default: null,
  },
  severity: {
    type: String,
    default: null,
  },
  airbagdeploys: {
    type: Boolean,
    default: null,
  },
  whichairbag: {
    type: String,
    default: null,
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
    damaged: Joi.String(),
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

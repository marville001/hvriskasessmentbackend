const mongoose = require("mongoose");
const Joi = require("joi");

const hvdamageSchema = new mongoose.Schema({
  batterydamaged: {
    type: Boolean,
    default: null,
  },
  leakingfluid: {
    type: Boolean,
    default: null,
  },
  anysmoke: {
    type: Boolean,
    default: null,
  },
  odor: {
    type: Boolean,
    default: null,
  },
  bcompdamaged: {
    type: Boolean,
    default: null,
  },
  batteryseparated: {
    type: Boolean,
    default: null,
  },
  electricaldamage: {
    type: Boolean,
    default: null,
  },
  cabledamage: {
    type: Boolean,
    default: null,
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
    default: "green",
  },
  notes: {
    type: Array,
    lowercase: true,
  },
});

const HVdamage = mongoose.model("HVdamage", hvdamageSchema);

function validateHVdamage(hvdamage) {
  const schema = {
    batterydamaged: Joi.Boolean(),
    leakingfluid: Joi.Boolean(),
    anysmoke: Joi.Boolean(),
    odor: Joi.Boolean(),
    bcompdamaged: Joi.Boolean(),
    batteryseparated: Joi.Boolean(),
    electricaldamage: Joi.Boolean(),
    cabledamage: Joi.string(),
    sessionid: Joi.number().required(),
    quiz: Joi.number(),
    level: Joi.String(),
  };
  return Joi.validate(hvdamage, schema);
}

module.exports = {
  HVdamage,
  validateHVdamage: validateHVdamage,
};

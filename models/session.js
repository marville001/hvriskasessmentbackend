const mongoose = require("mongoose");
const Joi = require("joi");

const sessionSchema = new mongoose.Schema({
  employeenumber: {
    type: String,
    required: true,
    lowercase: true,
  },
  date: {
    type: String,
    required: true,
    lowercase: true,
  },
  step: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
    lowercase: true,
  },
  endedby:{
    type: String,
    lowercase: true,
    default: null
  }
});

const Session = mongoose.model("Session", sessionSchema);

function validateSession(session) {
  const schema = {
    employeenumber: Joi.string().required(),
    date: Joi.string().required(),
    state: Joi.string().required(),
    step: Joi.number().required(),
  };
  return Joi.validate(session, schema);
}

module.exports = {
  Session,
  validate: validateSession,
};

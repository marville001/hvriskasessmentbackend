const mongoose = require("mongoose");
const Joi = require("joi");

const rpartySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 6,
    maxlength: 50,
  },
  sessionid: {
    type: String,
    maxlength: 50,
  },
  number: {
    type: String,
    maxlength: 255,
  },
  address: {
    type: String,
    maxlength: 1024,
  },
  claim_number: {
    type: String,
    maxlength: 1024,
  },
  insuranceprovider: {
    type: String,
    maxlength: 1024,
  },
  policy: {
    type: String,
    maxlength: 1024,
  },
});


const Rparty = mongoose.model("Rparty", rpartySchema);

function validateRparty(rparty) {
  const schema = {
    name: Joi.string().min(5).max(50),
    sessionid: Joi.string().min(5).max(50),
    number: Joi.string().max(255),
    address: Joi.string().max(255),
    claim_number: Joi.string().max(255),
    policy: Joi.string().max(1024),
    insuranceprovider: Joi.string().max(1024),
  };
  return Joi.validate(rparty, schema);
}

module.exports = {
  Rparty,
  validateRparty,
};

const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const Joi = require("joi");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({
    success: true,
    user: _.pick(user, [
      "_id",
      "name",
      "idnumber",
      "email",
      "address",
      "phone",
    ]),
  });
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send({ success: false, message: "user already registered..." });

  user = new User(
    _.pick(req.body, [
      "name",
      "idnumber",
      "email",
      "password",
      "address",
      "phone",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send({
    success: true,
    user: _.pick(user, [
      "_id",
      "name",
      "idnumber",
      "email",
      "isAdmin",
      "address",
      "phone",
    ]),
    token: user.generateAuthToken(),
  });
});

router.put("/:id", auth, async (req, res) => {
  const {id} = req.params;
  const { error } = validateUserUpdate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  let user = await User.findByIdAndUpdate(
    id,
    _.pick(req.body, [
      "name",
      "idnumber",
      "email",
      "address",
      "phone",
    ]),
    { new: true }
  );

  let result = await user.save();

  res.send({
    success: true,
    user : result,
  });
});

function validateUserUpdate(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    idnumber: Joi.string().min(6).max(255).required(),
    address: Joi.string().min(6).max(255).required(),
    phone: Joi.string().min(10).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;

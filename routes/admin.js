const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const router = express.Router();
const { Admin, validateAdmin } = require("../models/admin");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("-password");
  res.send({
    success: true,
    admin: _.pick(admin, ["_id", "name", "email", "isAdmin"]),
  });
});

router.get("/all", auth, async (req, res) => {
  const admins = await Admin.find().select("-password");
  res.send({
    success: true,
    admins,
  });
});

router.get("/employees/all", auth, async (req, res) => {
  const employees = await User.find().select("-password");
  res.send({
    success: true,
    employees,
  });
});

router.post("/", auth, async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  let admin = await Admin.findOne({ email: req.body.email });
  if (admin)
    return res
      .status(400)
      .send({ success: false, message: "Admin already registered..." });

  admin = new Admin(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  await admin.save();

  res.send({
    success: true,
    admin: _.pick(admin, ["_id", "name", "email"]),
    token: admin.generateAuthToken(),
  });
});

router.post("/auth", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin)
    return res
      .status(400)
      .send({ success: false, message: "Invalid email or password..." });

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  console.log(validPassword);
  if (!validPassword)
    return res
      .status(400)
      .send({ success: false, message: "Invalid email or password..." });

  res.send({
    success: true,
    admin: _.pick(admin, ["_id", "name", "email", "isAdmin"]),
    token: admin.generateAuthToken(),
  });

});

function validate(req) {
  const schema = {
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;

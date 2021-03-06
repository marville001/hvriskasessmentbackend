const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const error = require("../middleware/error");
const home = require("../routes/home");
const auth = require("../routes/auth");
const users = require("../routes/users");
const admin = require("../routes/admin");
const session = require("../routes/session");
const caller = require("../routes/caller");
const hazard = require("../routes/hazard");
const vdamage = require("../routes/vdamage");
const hvdamage = require("../routes/hvdamage");
const email = require("../routes/email");
const defaults = require("../routes/defaults");
const upload = require("../routes/upload");
const rparty = require("../routes/rparty");
const vehicle = require("../routes/vehicle");

module.exports = function (app) {
  app.use(cors());
  app.use(fileUpload());
  app.use(express.json());
  app.use("/static", express.static("public"));
  app.use("/", home);
  app.use("/api/session", session);
  app.use("/api/caller", caller);
  app.use("/api/rparty", rparty);
  app.use("/api/vehicle", vehicle);
  app.use("/api/hazard", hazard);
  app.use("/api/vdamage", vdamage);
  app.use("/api/hvdamage", hvdamage);
  app.use("/api/defaults", defaults);
  app.use("/api/upload", upload);
  app.use("/api/email", email);
  app.use("/api/users", users);
  app.use("/api/admin", admin);
  app.use("/api/auth", auth);
  app.use(error);
};

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { VehicleMake } = require("../models/vehiclemake");

router.get("/make", async (req, res) => {
  let result = await VehicleMake.find().select("make");

  res.send({ success: true, make: result[0] });
});

module.exports = router;

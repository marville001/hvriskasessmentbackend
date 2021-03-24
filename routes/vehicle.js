const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Vehicle } = require("../models/vehicle");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", auth, async (req, res) => {
  // const { error } = validateVehicle(req.body);
  // if (error)
  //   return res.status(400).send({
  //     success: false,
  //     message: error.details[0].message,
  //   });

  const { vin, model, sessionid, licence, lpstate, make, year } = req.body;

  let vehicle = new Vehicle({
    vin,
    sessionid,
    model,
    licence,
    lpstate,
    make,
    year,
  });
  const result = await vehicle.save();

  res.send({
    success: true,
    vehicle: result,
  });
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  // const { error } = validateVehicle(req.body);
  // if (error)
  //   return res.status(400).send({
  //     success: false,
  //     message: error.details[0].message,
  //   });

  const { vin, model, licence, lpstate, make, year } = req.body;

  try {
    let vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { vin, model, licence, lpstate, make, year },
      { new: true }
    );

    const result = await vehicle.save();

    res.send({
      success: true,
      vehicle: result,
    });
  } catch (error) {
    res.status(404).send({
      success: true,
      message: "Failed to update",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Invalid Session Id",
    });
  }
  const vehicle = await Vehicle.findOne({ sessionid: id });
  if (vehicle) {
    res.send({
      success: true,
      vehicle,
    });
  } else {
    res.status(404).send({
      success: true,
      message: "No session Found",
    });
  }
});

module.exports = router;

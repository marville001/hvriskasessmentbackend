const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Session, validate } = require("../models/session");
const { Caller, validateCaller } = require("../models/caller");
const { Vehicle, validateVehicle } = require("../models/vehicle");
const { Hazard } = require("../models/hazard");
const ObjectId = require("mongoose").Types.ObjectId;
const { Vdamage } = require("../models/vdamage");
const { HVdamage } = require("../models/hvdamage");

router.post("/create", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error)
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    });

  const { employeenumber, date, state, step } = req.body;

  session = new Session({
    employeenumber,
    date,
    state,
    step,
  });
  const result = await session.save();

  const hazard = Hazard({
    sessionid: result._id,
    quiz: 1,
  });
  await hazard.save();

  const vdamage = Vdamage({
    sessionid: result._id,
    quiz: 1,
  });
  await vdamage.save();

  const hvdamage = HVdamage({
    sessionid: result._id,
    quiz: 1,
  });
  await hvdamage.save();

  res.send({
    success: true,
    result,
  });
});

router.put("/hazard-details", auth, async (req, res) => {
  const { error } = validateVehicle(req.body);
  if (error)
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    });

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

router.post("/all", auth, async (req, res) => {
  const { empid } = req.body;
  let { state, key, searchby, count } = req.query;

  key = key[0];

  let results = await Session.find().select("-__v");

  results = results.slice(0, count);

  if (state === "all") {
    results = [...results];
  } else {
    results = results.filter((result) => result.state === state);
  }
  
  res.send({ success: true, sessions: results });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Invalid Session Id",
    });
  }
  const session = await Session.findById(id);
  if (session) {
    res.send({
      success: true,
      session: _.pick(session, [
        "_id",
        "date",
        "state",
        "step",
        "employeenumber",
      ]),
    });
  } else {
    res.status(404).send({
      success: true,
      message: "No session Found",
    });
  }
});

router.put("/updatesession/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let session = await Session.findByIdAndUpdate(
      id,
      { step: req.body.step, state: req.body.state },
      { new: true }
    );

    res.send({
      success: true,
      session: _.pick(session, [
        "_id",
        "date",
        "state",
        "step",
        "employeenumber",
      ]),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/resume/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let session = await Session.findByIdAndUpdate(
      id,
      { state: req.body.state },
      { new: true }
    );

    res.send({
      success: true,
      session: _.pick(session, [
        "_id",
        "date",
        "state",
        "step",
        "employeenumber",
      ]),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

module.exports = router;

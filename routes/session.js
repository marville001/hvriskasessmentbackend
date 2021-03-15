const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Session, validate } = require("../models/session");
const { Caller, validateCaller } = require("../models/caller");
const { Vehicle, validateVehicle } = require("../models/vehicle");
const { Rparty, validateRparty } = require("../models/rparty");
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

  let session = await Session.findOne({
    employeenumber: req.body.employeenumber,
    state: "ongoing",
  });

  if (session)
    return res.status(400).send({
      success: false,
      message: "You have an ongoing session. You cannot create another session",
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
    quiz: 1
  })
  await hazard.save();

  const vdamage = Vdamage({
    sessionid: result._id,
    quiz: 1
  })
  await vdamage.save();

  const hvdamage = HVdamage({
    sessionid: result._id,
    quiz: 1
  })
  await hvdamage.save();

  res.send({
    success: true,
    result,
  });
});

router.post("/caller-details", auth, async (req, res) => {
  const { error } = validateCaller(req.body);
  if (error)
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    });

  const {
    name,
    number,
    sessionid,
    email,
    supervisor,
    organization_address,
    organization_number,
    location,
    organization,
  } = req.body;

  let caller = new Caller({
    name,
    sessionid,
    number,
    email,
    supervisor,
    organization_address,
    organization_number,
    location,
    organization,
  });
  const result = await caller.save();

  res.send({
    success: true,
    caller: result,
  });
});

router.post("/rparty-details", auth, async (req, res) => {
  const { error } = validateRparty(req.body);
  if (error)
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    });

  const {
    name,
    number,
    sessionid,
    address,
    claim_number,
    policy,
    insuranceprovider,
  } = req.body;

  let rparty = new Rparty({
    name,
    number,
    sessionid,
    address,
    claim_number,
    policy,
    insuranceprovider,
  });
  const result = await rparty.save();

  res.send({
    success: true,
    rparty: result,
  });

});

router.post("/vehicle-details", auth, async (req, res) => {
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
  let result = await Session.find().select("-__v");
  sessions = result.filter((s) => s.employeenumber === empid);

  res.send({ success: true, sessions: sessions });
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

module.exports = router;

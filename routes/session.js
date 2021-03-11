const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Session, validate } = require("../models/session");
const { Caller, validateCaller } = require("../models/caller");
const ObjectId = require("mongoose").Types.ObjectId;

// router.get("/search", async (req, res) => {
//   const { query } = req.query;

//   const result = await Product.find().select("-__v");
//   let products = [];
//   if (query.indexOf(" ") === -1) {
//     products = result.filter(
//       (p) =>
//         p.name.toLowerCase().split(" ").includes(query) ||
//         p.description.toLowerCase().split(" ").includes(query)
//     );
//   } else {
//     products = result.filter(
//       (p) =>
//         p.name.toLowerCase().includes(query) ||
//         p.description.toLowerCase().includes(query)
//     );
//   }

//   res.send({ success: true, products });
// });

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

  let caller = await Caller.findOne({
    email: req.body.email,
  });

  if (caller) {
    const updated_caller = await Caller.findByIdAndUpdate(
      caller._id,
      { location: req.body.location },
      { new: true }
    );
    return res.status(200).send({
      success: false,
      message: "Caller Exists",
      caller: updated_caller,
    });
  }

  const {
    name,
    number,
    email,
    supervisor,
    organization_address,
    organization_number,
    location,
    organization,
  } = req.body;

  caller = new Caller({
    name,
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

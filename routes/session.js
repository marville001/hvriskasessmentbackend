const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Session, validate } = require("../models/session");
const ObjectId = require('mongoose').Types.ObjectId;

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

  const { employeenumber, date, state, step } = req.body;

  const session = new Session({
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

router.post("/all", auth, async (req, res) => {
  const { empid } = req.body;
  console.log(empid);
  let result = await Session.find().select("-__v");
  sessions = result.filter(
    (s) => s.employeenumber === empid
  );
  
  res.send({ success: true, sessions: sessions });
});

router.get("/:id",async (req, res) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)){
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

module.exports = router;

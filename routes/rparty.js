const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Rparty } = require("../models/rparty");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", auth, async (req, res) => {
  // const { error } = validateRparty(req.body);
  // if (error)
  //   return res.status(400).send({
  //     success: false,
  //     message: error.details[0].message,
  //   });

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

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  // const { error } = validateRparty(req.body);
  // if (error)
  //   return res.status(400).send({
  //     success: false,
  //     message: error.details[0].message,
  //   });

  const {
    name,
    number,
    address,
    claim_number,
    policy,
    insuranceprovider,
  } = req.body;

  try {
    let rparty = await Rparty.findByIdAndUpdate(
      id,
      {
        name,
        number,
        address,
        claim_number,
        policy,
        insuranceprovider,
      },
      { new: true }
    );

    const result = await rparty.save();

    res.send({
      success: true,
      rparty: result,
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
  const rparty = await Rparty.findOne({ sessionid: id });
  if (rparty) {
    res.send({
      success: true,
      rparty,
    });
  } else {
    res.status(404).send({
      success: true,
      message: "No session Found",
    });
  }
});

module.exports = router;

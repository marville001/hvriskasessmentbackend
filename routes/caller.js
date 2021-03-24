const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Caller, validateCaller } = require("../models/caller");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", auth, async (req, res) => {
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

  try {
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
    
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { error } = validateCaller(req.body);
  if (error)
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    });

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

  try {
    let caller = await Caller.findByIdAndUpdate(
      id,
      {
        name,
        number,
        email,
        supervisor,
        organization_address,
        organization_number,
        location,
        organization,
      },
      { new: true }
    );

    const result = await caller.save();

    res.send({
      success: true,
      caller: result,
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
  const caller = await Caller.findOne({ sessionid: id });
  if (caller) {
    res.send({
      success: true,
      caller,
    });
  } else {
    res.status(404).send({
      success: true,
      message: "No session Found",
    });
  }
});

module.exports = router;

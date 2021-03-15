const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Vdamage, validateVdamage } = require("../models/vdamage");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  let vdamage = await Vdamage.find({sessionid: id}).select("-__v");

  if (vdamage) {
    res.send({
      success: true,
      vdamage: vdamage[0],
    });
  } else {
    res.status(404).send({
      success: false,
      message: "No Vehicle Damage Found",
    });
  }
});

router.put("/onfiffre", auth, async (req, res) => {
  const { onfire, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { onfire: onfire, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      hazard,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

module.exports = router;
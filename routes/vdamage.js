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

  let vdamage = await Vdamage.find({ sessionid: id }).select("-__v");

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

router.put("/position", auth, async (req, res) => {
  const { position, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { position: position, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/damaged", auth, async (req, res) => {
  const { damaged, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { damaged: damaged, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
      console.log(error);
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/submerged", auth, async (req, res) => {
  const { submerged, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { submerged: submerged, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/bareaflooded", auth, async (req, res) => {
  const { bareaflooded, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { bareaflooded: bareaflooded, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/onfire", auth, async (req, res) => {
  const { onfire, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { onfire: onfire, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/severity", auth, async (req, res) => {
  const { severity, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { severity: severity, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/airbagdeploys", auth, async (req, res) => {
  const { airbagdeploys, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { airbagdeploys: airbagdeploys, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/whichairbag", auth, async (req, res) => {
  const { whichairbag, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { whichairbag: whichairbag, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/anypartofhvexposed", auth, async (req, res) => {
  const { anypartofhvexposed, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let vdamage = await Vdamage.findByIdAndUpdate(
      id,
      { anypartofhvexposed: anypartofhvexposed, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      vdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

module.exports = router;

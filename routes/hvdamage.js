const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { HVdamage } = require("../models/hvdamage");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  let hvdamage = await HVdamage.find({ sessionid: id }).select("-__v");

  if (hvdamage) {
    res.send({
      success: true,
      hvdamage: hvdamage[0],
    });
  } else {
    res.status(404).send({
      success: false,
      message: "No Vehicle Damage Found",
    });
  }
});

router.put("/batterydamaged", auth, async (req, res) => {
  const { batterydamaged, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { batterydamaged: batterydamaged, quiz: 2 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/leakingfluid", auth, async (req, res) => {
  const { leakingfluid, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { leakingfluid: leakingfluid, quiz: 3 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/anysmoke", auth, async (req, res) => {
  const { anysmoke, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { anysmoke: anysmoke, quiz: 4 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/odor", auth, async (req, res) => {
  const { odor, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { odor: odor, quiz: 5 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/bcompdamaged", auth, async (req, res) => {
  const { bcompdamaged, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { bcompdamaged: bcompdamaged, quiz: 6 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/batteryseparated", auth, async (req, res) => {
  const { batteryseparated, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { batteryseparated: batteryseparated, quiz: 7 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/electricaldamage", auth, async (req, res) => {
  const { electricaldamage, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { electricaldamage: electricaldamage, quiz: 8 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/cabledamage", auth, async (req, res) => {
  const { cabledamage, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { cabledamage: cabledamage, quiz: 8 },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});

router.put("/level", auth, async (req, res) => {
  const { level, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hvdamage = await HVdamage.findByIdAndUpdate(
      id,
      { level: level },
      { new: true }
    );

    res.send({
      success: true,
      hvdamage,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured",
    });
  }
});



module.exports = router;

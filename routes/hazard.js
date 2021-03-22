const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Hazard, validateHazard } = require("../models/hazard");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  let hazard = await Hazard.find({sessionid: id}).select("-__v");

  if (hazard) {
    res.send({
      success: true,
      hazard: hazard[0],
    });
  } else {
    res.status(404).send({
      success: false,
      message: "No hazard Found",
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

router.put("/smoking", auth, async (req, res) => {
  const { smoking, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { smoking: smoking, quiz: 3 },
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

router.put("/anysound", auth, async (req, res) => {
  const { anysound, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { anysound: anysound, quiz: 4 },
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

router.put("/anysmell", auth, async (req, res) => {
  const { anysmell, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { anysmell: anysmell, quiz: 5 },
      { new: true }
    );

    res.send({
      success: true,
      hazard,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured."+error,
    });
  }
});

router.put("/electricshutdown", auth, async (req, res) => {
  const { electricshutdown, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { electricshutdown: electricshutdown, quiz: 6 },
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

router.put("/shutdown", auth, async (req, res) => {
  const { shutdown, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { shutdown: shutdown, quiz: 6 },
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

router.put("/level", auth, async (req, res) => {
  const { level, id } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send({
      success: true,
      message: "Could not verify the session id",
    });
  }

  try {
    let hazard = await Hazard.findByIdAndUpdate(
      id,
      { level: level, quiz: 6 },
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

const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const path = require("path");
const { Image } = require("../models/image");

router.post("/images/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  if (!ObjectId.isValid(sessionId)) {
    return res.status(404).send({
      success: true,
      message: "Invalid Session Id",
    });
  }

  if (!req.files) {
    return res.status(500).send({ message: "file is not found" });
  }

  const rand = Math.floor(Math.random() * 100);

  // accessing the file
  const myFile = req.files.file;
  const saveName = sessionId + "-" + rand + myFile.name;

  try {
    myFile.mv(`${__dirname}/../public/uploads/${saveName}`)
  } catch (error) {
    return res.status(500).send({ message: error });
  }
  image = new Image({
    name: saveName,
    imgUrl:
      "https://hvriskassessment.herokuapp.com/static/uploads/" + saveName,
    sessionid: sessionId,
  });

  const result = await image.save();
  // returing the response with file path and name
  return res.send({ success: true, image: result });
});

module.exports = router;

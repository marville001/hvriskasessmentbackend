const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  //  const db = config.get("local_db");
  const db = config.get("dbUrl");
  console.log("DB String :"+db);
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."));
};

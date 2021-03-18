const winston = require("winston");
const express = require("express");
const app = express();


require("express-async-errors");
require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Listenning at port ${port}`);
});

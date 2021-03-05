const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const { Session, validate } = require("../models/session");

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

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   const product = await Product.findById(id);
//   if (product) {
//     res.send({
//       success: true,
//       product: _.pick(product, [
//         "_id",
//         "tags",
//         "name",
//         "price",
//         "imageUrl",
//         "description",
//         "count",
//         "total",
//       ]),
//     });
//   } else {
//     res.send({
//       success: true,
//       message: "No product Found",
//     });
//   }
// });

module.exports = router;

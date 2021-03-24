const express = require("express");
const Joi = require("joi");
const router = express.Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const { VehicleMake, validateVehicleMake } = require("../models/vehiclemake");
const { Caller } = require("../models/caller");

router.post("/send", async (req, res) => {

  const { link, subject,body, sessionId} = req.body;

  const caller = await Caller.findOne({sessionid : sessionId});

  if(!caller){
    return res.status(400).send({message:"No caller found"})
  }

  const {name, email} = caller
  try {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtp.gmail.com",
        // service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "mwangimartin1904@gmail.com",
          pass: "Martin@1904",
        },
        requireTLS: true,
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    const mailOptions = {
      from: "mwangimartin1904@gmail.com",
      to: email,
      subject: subject,
      html: `
            <h4>Hello ${name}</h4>
            <h4>${body}</h4>
            <p>${link}</p>
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error });
      } else {
        res.status(200).send({
          success: true,
          message: "Email sent ",
        });
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error });
  }
});

router.post("/make", async (req, res) => {
  const { email, subject, link } = validate(req.body);
  const make = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Buick",
    "Cadillac",
    "Caterham",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Maserati",
    "Mazda",
    "Mercedes Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Ram Trucks",
    "Rolls Royce",
    "Smart",
    "Subaru",
    "Toyota",
    "Tesla",
    "Volkswagen",
    "Volvo",
  ];

  const vmake = VehicleMake({
    make: make,
  });

  await vmake.save();
  res.send({
    success: true,
    vmake,
  });

});

function validate(req) {
  const schema = {
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;

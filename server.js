//
const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
// SCHEMA
// const { Quiz } = require("./models/Schema");
// const auth = require("./middleWare/auth");

// Middleware
const app = express();
app.use(
  cors({
    origin: "*", // Allow this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());

// connecting db
let dbURL = process.env.DBURL;
// initializing port
const PORT = process.env.PORT || 5000;

//Create our openAi instance


// connecting the db
const options = {
  ssl: false,
};

mongoose
  .connect(dbURL, options)
  .then((result) => {
    app.listen(PORT);
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// API

app.get("/", async (req, res) => {
  res.json({ msg: "Gotten successfully" });
});


// ROUTES
app.use("/api/user", require("./Routes/user"));
app.use("/api/mine", require("./Routes/mining"));

const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//MIDDLEWARE
const auth = require("../middleWare/auth");

// SCHEMA
const { User } = require("../models/Schema");

const secretKey = process.env.SECRET_KEY;
// For Creating token
const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

// Working for register users
router.post("/", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    const user = new User({
      email,
      password,
    });
    await user.save();
    //  generating a token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = createToken(payload);
    res.json({
      msg: "Registered Successfully",
      jwt: token,
    });
  } catch (error) {
    // console.log(error.message);
    if (error.message.includes("email has already been taken")) {
      res.status(500).json({ err: "email has already been taken" });
    } else {
      res.status(500).json({ err: "Please fill all inputs" });
    }
  }
});

// WORKING FOR LOGIN

router.put("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ err: "Invalid Credentials" });
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ err: "Invalid Credentials" });
    }

    // Create JWT token
    const payload = { user: { id: user.id } };
    const token = createToken(payload);
    const currentDate = new Date();
    const lastLoginDate = new Date(user.lastLogin);
    // Check for user verification and update points
    const isSameDay =
      currentDate.getFullYear() === lastLoginDate.getFullYear() &&
      currentDate.getMonth() === lastLoginDate.getMonth() &&
      currentDate.getDate() === lastLoginDate.getDate();
    if (!isSameDay) {
      await User.findByIdAndUpdate(user.id, {
        $inc: { point: 1000 },
        $set: { lastLogin: currentDate },
      });
    }

    res.json({
      msg: "Logged Successfully",
      jwt: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Server Error" });
  }
});

// GET USER INFO
router.get("/", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;

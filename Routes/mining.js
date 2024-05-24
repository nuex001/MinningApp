const express = require("express");
const { urlencoded } = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");
require("dotenv").config();

//MIDDLEWARE
const auth = require("../middleWare/auth");

// SCHEMA
const { User } = require("../models/Schema");

// MINE & CLAIM
const MINE_HOURS = 6;
router.post("/", auth, async (req, res) => {
  try {
    const { id } = req.user;
    //check if you have attempted already
    const user = await User.findById(id);
    // we check if user exists
    if (!user) {
      return res.status(400).json({ err: "user not found!" });
    }
    // Check if the user has started mining
    const currentDate = new Date();
    const lastMiningDate = new Date(user.lastMining);
    if (!user.lastMining) {
      await User.findByIdAndUpdate(user.id, {
        $set: { lastMining: currentDate },
      });
      return res.json({ msg: "Yoo mining Just started🤭" });
    }
    if (user.claimed) {
      return res.status(400).json({ msg: "Sorry No mining going on, Already claimed" });
    }

    // Calculate total hours for current date and last mining date
    const currentTotalHours =
      currentDate.getHours() + currentDate.getMinutes() / 60;
    const lastMiningTotalHours =
      lastMiningDate.getHours() + lastMiningDate.getMinutes() / 60;

    // Check if mining period has passed
    const hoursPassed = (currentTotalHours - lastMiningTotalHours + 24) % 24;
    if (user.lastMining && !user.claimed && hoursPassed < MINE_HOURS) {
      return res.status(400).json({ err: "Sorry, mining still going on🤭" });
    }

    // Update points and lastMining if mining period has passed
    if (hoursPassed >= MINE_HOURS && !user.claimed) {
      await User.findByIdAndUpdate(user.id, {
        $inc: { point: 600 },
        $set: { lastMining: null },
      });
      return res.json({ msg: "Just claimed successfully🤭" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;


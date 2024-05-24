const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    point: {
      type: Number,
      default: 1000,
    },
    lastMining: {
      type: Date,
      default: null, // Default value is null, indicating no attempt yet
    },
    lastLogin: {
      type: Date,
      default: Date, // Default value is Date, indicating currentTimestamp, we created this
    },
    claimed: {
      type: Boolean,
      default: false, // Default value is false, indicating no claimed yet
    },
  },
  { timestamps: true }
);

// Unique validation
userSchema.plugin(uniqueValidator, {
  message: "{PATH} has already been taken",
});

// Hashing password
userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

//model
const User = mongoose.model("user", userSchema);

module.exports = { User };

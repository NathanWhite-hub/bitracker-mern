const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 10,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    team: {
      type: String,
      require: true,
    },
    hasRoundingModule: {
      type: Boolean,
      require: false,
    },
    hasManagerModule: {
      type: Boolean,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

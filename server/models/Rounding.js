const mongoose = require("mongoose");

const RoundingSchema = new mongoose.Schema(
  {
    cartSerialNumber: {
      type: String,
      require: true,
      min: 3,
      max: 35,
      unique: true,
    },
    pcNumber: {
      type: String,
      required: false,
      min: 7,
    },
    hospitalRoundedAt: {
      type: String,
      required: true,
      min: 4,
    },
    isPowerCordDamaged: {
      type: Boolean,
      required: false,
    },
    isFuseBlown: {
      type: Boolean,
      required: false,
    },
    isInverterBad: {
      type: Boolean,
      required: false,
    },
    isInterfaceDamaged: {
      type: Boolean,
      required: false,
    },
    isPhysicalDamage: {
      type: Boolean,
      required: false,
    },
    otherNotes: {
      type: String,
      required: false,
    },
    roundedBy: {
      type: String,
      require: true,
    },
    roundedByName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rounding", RoundingSchema);

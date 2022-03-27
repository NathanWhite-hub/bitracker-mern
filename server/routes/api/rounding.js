// Dependencies
const router = require("express").Router();
const mongoose = require("mongoose");

// User Model
const User = require("../../models/User");
// RoundingCart Model
const RoundingCart = require("../../models/Rounding");
const { findOne } = require("../../models/User");

// @route   POST api/rounding/rounding_cart_save
// @desc    A cart is rounded and posted to DB
// @access  Private
router.post("/rounding_cart_save", async (req, res) => {
  try {
    const requestSerialNumber = req.body.cartSerialNumber.toUpperCase();
    const requestPCNumber = req.body.pcNumber.toUpperCase();

    const findIfCartExists = await RoundingCart.findOne({
      cartSerialNumber: requestSerialNumber,
    });

    if (findIfCartExists) {
      const updatedInformation = {
        cartSerialNumber: requestSerialNumber,
        pcNumber: requestPCNumber,
        hospitalRoundedAt: req.body.hospitalRoundedAt,
        isPowerCordDamaged: req.body.isPowerCordDamaged,
        isFuseBlown: req.body.isFuseBlown,
        isInverterBad: req.body.isInverterBad,
        isInterfaceDamaged: req.body.isInterfaceDamaged,
        isPhysicalDamage: req.body.isPhysicalDamage,
        otherNotes: req.body.otherNotes,
        roundedBy: req.user.id,
        roundedByName: req.user.firstName + " " + req.user.lastName,
      };

      await RoundingCart.updateOne(findIfCartExists, updatedInformation);
      return res.status(200).json({
        success: true,
        message: `Cart ${req.body.cartSerialNumber} Rounded Successfully!`,
      });
    } else {
      //Create new rounded cart
      const newRoundingCart = new RoundingCart({
        cartSerialNumber: requestSerialNumber,
        pcNumber: requestPCNumber,
        hospitalRoundedAt: req.body.hospitalRoundedAt,
        isPowerCordDamaged: req.body.isPowerCordDamaged,
        isFuseBlown: req.body.isFuseBlown,
        isInverterBad: req.body.isInverterBad,
        isInterfaceDamaged: req.body.isInterfaceDamaged,
        isPhysicalDamage: req.body.isPhysicalDamage,
        otherNotes: req.body.otherNotes,
        roundedBy: req.user.id,
        roundedByName: req.user.firstName + " " + req.user.lastName,
      });

      //Save cart and return a response
      const cart = await newRoundingCart.save();
      return res.status(200).json({
        success: true,
        message: `Cart ${req.body.cartSerialNumber} Rounded Successfully!`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `An error occured!`,
    });
  }
});

router.get("/get_rounding_carts", async (req, res) => {
  const findCartsRounded = await RoundingCart.find({ roundedBy: req.user.id });
  return res.status(200).json(findCartsRounded);
});

router.get("/view_rounded_cart", async (req, res) => {
  const findRoundedCart = await RoundingCart.findOne({
    cartSerialNumber: req.query.cart_serial_num,
  });
  return res.status(200).json(findRoundedCart);
});

router.post("/update_cart", async (req, res) => {
  RoundingCart.findByIdAndUpdate(req.body.id, req.body, function (err, cart) {
    cart.cartSerialNumber = req.body.cartSerialNumber;
    cart.pcNumber = req.body.pcNumber;
    cart.hospitalRoundedAt = req.body.hospitalRoundedAt;
    cart.isPowerCordDamaged = req.body.isPowerCordDamaged;
    cart.isFuseBlown = req.body.isFuseBlown;
    cart.isInventerBad = req.body.isInventerBad;
    cart.isInterfaceDamaged = req.body.isInterfaceDamaged;
    cart.isPhysicalDamage = req.body.isPhysicalDamage;
    cart.roundedByName = req.user.firstName + " " + req.user.lastName;
    cart.save();
    return res.status(200).json({
      success: true,
      message: `Cart Updated!`,
    });
  });
});

module.exports = router;

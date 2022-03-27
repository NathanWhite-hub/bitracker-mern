const router = require("express").Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const RoundingCart = require("../../models/Rounding");
const User = require("../../models/User");

router.get("/get_month_rounding", async (req, res) => {
  var month = req.query.currentMonth;
  var year = req.query.currentYear;
  var start = new Date(year + "-" + month + "-" + 1);
  var end = new Date(
    year + "-" + month + "-" + 31 + "T" + 23 + ":" + 59 + ":" + 59
  );

  const findCurrentMonthCartsRounded = await RoundingCart.find({
    updatedAt: { $gte: start, $lte: end },
  });
  return res.status(200).json(findCurrentMonthCartsRounded);
});

router.get("/get_rounding_by", async (req, res) => {
  var startDate = new Date(req.query.startDate);
  var endDate = new Date(req.query.endDate);

  const findCartsRounded = await RoundingCart.find({
    updatedAt: { $gte: startDate, $lte: endDate },
  });

  return res.status(200).json(findCartsRounded);
});

router.post("/create_user", async (req, res) => {
  try {
    // Validation
    if (
      !req.body.userName ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.team
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields empty. Please enter required information.",
      });
    } else if (req.body.password.length < 10 || req.body.password.length > 22) {
      return res.status(400).json({
        success: false,
        message:
          "Password length under minimum or above maximum. (10 to 22 characters)",
      });
    }

    // Check for existing user
    User.findOne({ userName: req.body.userName }).then((user) => {
      console.log(req.body.userName);
      if (user)
        return res.status(400).json({
          success: false,
          message: "User already exists.",
        });

      const newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        team: req.body.team,
        hasRoundingModule: req.body.hasRoundingModule,
        hasManagerModule: req.body.hasManagerModule,
      });

      //Generate new password
      bcrypt.genSalt(13, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
      return res.status(200).json({
        success: true,
        message: `User Created!`,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/update_user", async (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body, function (err, user) {
    if (req.body.password == "") {
      user.username = req.body.userName;
      user.firstname = req.body.firstName;
      user.lastname = req.body.lastName;
      user.team = req.body.team;
      user.save();
      return res.status(200).json({
        success: true,
        message: `User Updated!`,
      });
    } else {
      user.username = req.body.userName;
      user.firstname = req.body.firstName;
      user.lastname = req.body.lastName;
      user.team = req.body.team;
      bcrypt.genSalt(13, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save();
        });
      });
      return res.status(200).json({
        success: true,
        message: `User Updated!`,
      });
    }
  });
});

router.get("/get_all_users", async (req, res) => {
  const findAllUsers = await User.find({}, "-password");
  console.log("Users found: " + findAllUsers);
  return res.status(200).json(findAllUsers);
});

router.get("/user", async (req, res) => {
  var userID = req.query.user_id;

  const findSelectedUser = await User.find({
    _id: userID,
  });
  console.log("User found: " + findSelectedUser);
  return res.status(200).json(findSelectedUser);
});

module.exports = router;

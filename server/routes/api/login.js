const router = require("express").Router();
const { body } = require("express-validator");
const passport = require("passport");

router.post(
  "/login",
  body("username").trim().escape(),
  body("password").trim().escape(),
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

module.exports = router;

const router = require("express").Router();
var passport = require("passport");

router.get("/protected-route", (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
  if (req.isAuthenticated()) {
    res.send({ success: true });
  } else {
    res.send({ success: false, message: "You cannot access this page." });
  }
});

module.exports = router;

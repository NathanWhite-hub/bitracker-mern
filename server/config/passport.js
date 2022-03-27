const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

const verifyCallback = (username, password, done) => {
  User.findOne({ userName: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      // Validate Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

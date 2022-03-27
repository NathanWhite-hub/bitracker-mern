// Dependencies
const router = require("express").Router();
const bcrypt = require("bcrypt");

// User Model
const User = require("../../models/User");

// @route   POST api/auth/create_user
// @desc    Create a new User
// @access  Public
router.post("/create_user", async (req, res) => {
  try {
    const { username, password, firstname, lastname, team } = req.body;

    // Validation
    if (!username || !password || !firstname || !lastname || !team) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing user
    User.findOne({ username }).then((user) => {
      if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = new User({
        username,
        password,
        firstname,
        lastname,
        team,
      });

      //Generate new password
      bcrypt.genSalt(13, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

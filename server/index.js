// Import Dependencies as Variables
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

// Import Morgan Debugging and Express Validtor Middleware
const morgan = require("morgan");
// USE EXPRESS VALIDATOR FOR SANITIZATION LATER
const { body, oneOf, validationResult } = require("express-validator");

const session = require("express-session");
var passport = require("passport");

const MongoStore = require("connect-mongo");

// Route Variables
const loginRoute = require("./routes/api/login");
const dashboardRoute = require("./routes/api/dashboard");
const isAuth = require("./middleware/authMiddleware").isAuth;
const hasRounding = require("./middleware/authMiddleware").hasRounding;
const hasManager = require("./middleware/authMiddleware").hasManager;
const roundingRoute = require("./routes/api/rounding");
const managerRoute = require("./routes/api/manager");
//const authRoute = require("./routes/api/auth");

app.set("trust proxy", 1);

const corsOptions = {
  origin: [
    "https://bitracker.app",
    "https://bitracker.app/dashboard",
    "https://api.bitracker.app",
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "X-Requested-With"],
  methods: ["POST", "GET", "OPTIONS", "PUT"],
};

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

/*
          ==============
          ==MIDDLEWARE==
          ==============
*/
app.use(cors(corsOptions));

// Express Parsing Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION SETUP
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
});

// Express Use Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
  })
);

// Initialize Passport and Use Session for Serialize/Deserialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Auth Middleware
const passportConfig = require("./config/passport");

// Debugger
app.use(morgan("common"));

/*
          ==========
          ==ROUTES==
          ==========
*/

// User Route
app.use("/api", loginRoute);

app.use("/login-success", (req, res, next) => {
  res.status(200).json({ success: true, message: "Logged successfully" });
});

app.use("/login-failure", (req, res, next) => {
  res
    .status(401)
    .json({ success: false, message: "Incorrect password or username" });
});

app.use("/api/get_user_name", (req, res, next) => {
  res.status(200).json({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    hasRoundingModule: req.user.hasRoundingModule,
    hasManagerModule: req.user.hasManagerModule,
  });
  next();
});

app.use("/api/protected-route", isAuth, (req, res, next) => {
  res.status(200).json({ success: true, message: "User Authenticated" });
});

/*app.use("/api/is-admin", isAdmin, (req, res, next) => {
  res.status(200).json({ success: true, message: "User Is Admin" });
});*/

// Rounding Route
app.use("/api", hasRounding, roundingRoute);

// Manager Route
app.use("/api", hasManager, managerRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running");
});

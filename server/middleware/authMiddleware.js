module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to view this resource",
    });
  }
};

module.exports.hasRounding = (req, res, next) => {
  if (req.isAuthenticated() && req.user.hasRoundingModule) {
    console.log("User has rounding module");
    console.log(req.user.hasRoundingModule);
    next();
  } else {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to view this resource.",
    });
  }
};

module.exports.hasManager = (req, res, next) => {
  if (req.isAuthenticated() && req.user.hasManagerModule) {
    next();
  } else {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to view this resource.",
    });
  }
};

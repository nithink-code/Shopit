const { redirect } = require("../middlewares.js");
const User = require("../models/user.js");
const expressError = require("../utils/expressError.js");

module.exports.signUp = async (req, res) => {
  try {
    let signUpError = false;
    let { username, email, password } = req.body;
    let NewUser = new User({
      username: username,
      email: email,
    });
    let registerUser = await User.register(NewUser, password).catch((err) => {
      console.log("signUpError");
      console.log(err);
      signUpError = true;
      res.json("signUpError");
    });
    if (!signUpError) {
      req.login(registerUser, (err) => {
        if (err) {
          console.log(err);
        } else {
          if (res.locals.redirect === undefined) {
            res.json({
              signUpStatus: "directSignUp",
              redirect: "/",
            });
          } else {
            res.json({
              signUpStatus: "success signUp",
              redirect: res.locals.redirect,
            });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.login = (req, res) => {
  console.log(res.locals.redirect);
  console.log(req.isAuthenticated());
  if (res.locals.redirect === undefined) {
    res.json({
      loginStatus: "directLogin",
      redirect: "/",
    });
  } else {
    res.json({
      loginStatus: "successLogin",
      redirect: res.locals.redirect,
    });
  }
};

module.exports.loginFailure = (req, res) => {
  console.log("failureLogin");
  res.json("failureLogin");
};

module.exports.logout = (req, res) => {
  try {
    req.logOut((err) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        console.log("loggedOut");
        res.send("loggedOut");
      }
    });
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.isLoggedIn = (req, res) => {
  res.json("LoggedIn");
};

module.exports.isOwnerRoute = (req, res) => {
  res.json("isOwner");
};

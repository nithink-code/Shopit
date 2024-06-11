const express = require("express");
const router = express.Router();
const {
  validateSignUpForm,
  validateLoginForm,
  isLoggedin,
  redirect,
} = require("../middlewares.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const usersController = require("../controllers/users.js");

//signup route
router.post(
  "/api/items/signUp",
  validateSignUpForm,
  redirect,
  wrapAsync(usersController.signUp)
);

//login route
router.post(
  "/api/items/login",
  validateLoginForm,
  redirect,
  passport.authenticate("user", {
    failureRedirect: "/api/loginFailure",
  }),
  usersController.login
);

router.get("/api/loginFailure", usersController.loginFailure);

//logout
router.get("/api/logOut", usersController.logout);

//separate route to check login status
router.post("/api/isLoggedIn", isLoggedin, usersController.isLoggedIn);

module.exports = router;

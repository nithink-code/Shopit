const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const Retailer = require("../models/retailer.js");
const { isLoggedin, isOwner } = require("../middlewares.js");
const {
  validateLoginForm,
  validateSignUpForm,
  checkUserRoleLoginForRetailer,
} = require("../middlewares.js");
const reatilerController = require("../controllers/retailer.js");

router.post(
  "/signUp",
  validateSignUpForm,
  wrapAsync(reatilerController.signUp)
);

router.post(
  "/login",
  validateLoginForm,
  passport.authenticate("retailer", {
    failureRedirect: "/api/retailer/loginfailure",
  }),
  reatilerController.login
);

router.get("/loginfailure", reatilerController.failureLogin);

router.post("/isLoggedIn", isLoggedin, reatilerController.isLoggedIn);

router.get(
  "/products",
  checkUserRoleLoginForRetailer,
  wrapAsync(reatilerController.retailerProducts)
);

//separate route to check retailer role and login
router.get("/roleAndLogin", checkUserRoleLoginForRetailer, (req, res) => {
  res.json("RoleIsRetailer");
});

//separate route to check owner of the product
router.post("/items/:id/isOwner", isOwner, reatilerController.isOwner);

module.exports = router;

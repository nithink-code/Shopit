const Retailer = require("../models/retailer.js");
const expressError = require("../utils/expressError.js");

module.exports.signUp = async (req, res) => {
  try {
    let signUpError = false;
    let { username, email, password } = req.body;
    let retailer = new Retailer({
      username: username,
      email: email,
    });

    let registeredRetailer = await Retailer.register(retailer, password).catch(
      (err) => {
        console.log("signUpError");
        console.log(err);
        signUpError = true;
        res.json("signUpError");
      }
    );
    if (!signUpError) {
      req.login(registeredRetailer, (err) => {
        if (err) {
          console.log(err);
          res.json("signUpError");
        } else {
          res.json({
            signUpStatus: "directSignUp",
            redirect: `/retailer`,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.login = (req, res) => {
  res.json({
    loginStatus: "directLogin",
    redirect: "/retailer",
  });
};

module.exports.failureLogin = (req, res) => {
  console.log("failure login");
  res.json("failureLogin");
};

module.exports.isLoggedIn = (req, res) => {
  res.json("Logged In");
};

module.exports.retailerProducts = async (req, res) => {
  try {
    let retailer = await Retailer.findById(req.user._id).populate("products");
    if (retailer) {
      res.json(retailer.products);
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.isOwner = (req, res) => {
  res.json("isOwner");
};

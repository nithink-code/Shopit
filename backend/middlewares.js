const {
  itemSchema,
  itemSchema2,
  signUpFormValidation,
  loginFormValidation,
} = require("./schemaValidation.js");
const expressError = require("./utils/expressError.js");
const Item = require("./models/Item.js");
const User = require("./models/user.js");

module.exports.validateItemSchema = (req, res, next) => {
  console.log("req.body:", req.body); // Add logging to debug
  console.log("req.file:", req.file); // Add logging to debug

  if (!req.file) {
    throw new expressError(422, "Image is required");
  }

  let { error } = itemSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(422, errorMsg);
  }

  next();
};

module.exports.validateItemSchema2 = (req, res, next) => {
  console.log("req.body:", req.body); // Add logging to debug
  console.log("req.file:", req.file); // Add logging to debug
  console.log("image", req.body.image);

  if (req.file === undefined) {
    if (req.body.image === "undefined") {
      throw new expressError(422, "Image is not entered");
    } else {
      let { error } = itemSchema2.validate(req.body);
      if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(422, errorMsg);
      }

      next();
    }
  } else {
    if (req.body.image === "undefined") {
      throw new expressError(422, "Image is not entered");
    } else {
      let { error } = itemSchema.validate(req.body);
      if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(422, errorMsg);
      }

      next();
    }
  }
};

module.exports.validateSignUpForm = (req, res, next) => {
  let { error } = signUpFormValidation.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(422, errMsg);
  } else {
    next();
  }
};

module.exports.validateLoginForm = (req, res, next) => {
  let { error } = loginFormValidation.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(422, errMsg);
  } else {
    next();
  }
};

module.exports.isLoggedin = (req, res, next) => {
  let { route } = req.body;
  if (!req.isAuthenticated()) {
    req.session.redirect = route;
    res.json("notLogIn");
  } else {
    next();
  }
};

module.exports.redirect = (req, res, next) => {
  res.locals.redirect = req.session.redirect;
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let item = await Item.findById(id)
    .populate("owner")
    .catch((err) => {
      console.log("isOwner error");
    });
  if (!item) {
    res.json("itemNotFound");
  } else if (!item.owner._id.equals(req.user._id)) {
    res.json("notOwner");
  } else if (item.owner._id.equals(req.user._id)) {
    next();
  }
};

module.exports.checkCartItem = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!req.user) {
      console.log("not login");
      res.json("You must login");
    } else if (req.user.role === "retailer") {
      res.json("Access denied for retailer");
    } else {
      let user = await User.findById(req.user._id)
        .populate({
          path: "cart",
          match: { _id: id },
        })
        .catch((err) => {
          console.log("No item found error");
        });
      if (!user) {
        res.json("noItemFound");
      } else if (user.cart.length === 0) {
        return next();
      } else {
        res.json("presentInCart");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.findUserRole = (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return next();
  }
};

module.exports.UserRole = (req, res, next) => {
  if (req.user) {
    if (req.user.role === "customer") {
      res.json("access denied for customers");
    } else if (req.user.role === "retailer") {
      return next();
    }
  } else {
    res.json("notLogin");
  }
};

module.exports.loginFormIsLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json("notLogIn");
  } else {
    return next();
  }
};

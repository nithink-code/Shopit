const User = require("../models/user.js");
const Item = require("../models/Item.js");
const expressError = require("../utils/expressError.js");

module.exports.addToCart = async (req, res) => {
  try {
    console.log("Add to cart route");
    let { id } = req.params;

    let item = await Item.findById(id).catch((err) => {
      console.log("Add to cart error");
    });
    if (!item) {
      res.json("itemNotFound");
    } else {
      let user = await User.findById(req.user._id);
      await user.cart.push(item);
      await user
        .save()
        .then((data) => {
          res.json("addedToCart");
        })
        .catch((err) => {
          console.log("Add to cart error");
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.showCartDetails = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate("cart");
    console.log("userCart");
    if (user) {
      res.json(user.cart);
    } else {
      res.json("noUserFound");
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { cart: id },
    }).catch((err) => {
      console.log("deleteCartError");
    });
    console.log("deleteCartUser");

    if (!user) {
      res.json("itemNotFound");
    } else {
      console.log("cart item deleted");

      res.json("cartItemDeleted");
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.checkCart = (req, res) => {
  res.json("notPresentInCart");
};

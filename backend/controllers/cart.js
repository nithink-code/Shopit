const User = require("../models/user.js");
const Item = require("../models/Item.js");

module.exports.addToCart = async (req, res) => {
  console.log("Add to cart route");
  let { id } = req.params;
  console.log(id);
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
        console.log(data);
        res.json("addedToCart");
      })
      .catch((err) => {
        console.log("Add to cart error");
        console.log(err);
      });
  }
};

module.exports.showCartDetails = async (req, res) => {
  let user = await User.findById(req.user._id).populate("cart");
  console.log("userCart");
  if (user) {
    res.json(user.cart);
  } else {
    res.json("noUserFound");
  }
};

module.exports.deleteCartItem = async (req, res) => {
  let { id } = req.params;
  let user = await User.findByIdAndUpdate(req.user._id, {
    $pull: { cart: id },
  }).catch((err) => {
    console.log("deleteCartError");
  });
  console.log("deleteCartUser");
  console.log(user);
  if (!user) {
    res.json("itemNotFound");
  } else {
    console.log("cart item deleted");
    console.log(user);
    res.json("cartItemDeleted");
  }
};

module.exports.checkCart = (req, res) => {
  res.json("notPresentInCart");
};

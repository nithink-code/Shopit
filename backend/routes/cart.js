const express = require("express");
const router = express.Router();
const { isLoggedin, checkCartItem } = require("../middlewares.js");
const wrapAsync = require("../utils/wrapAsync.js");
const cartController = require("../controllers/cart.js");

//add to cart
router.get(
  "/:id/addcart",
  isLoggedin,
  checkCartItem,
  wrapAsync(cartController.addToCart)
);

// show cart details
router.get(
  "/cartdetails",
  isLoggedin,
  wrapAsync(cartController.showCartDetails)
);

//delete cart items
router.delete("/:id", isLoggedin, wrapAsync(cartController.deleteCartItem));

//check item already present in cart or not
router.get("/:id/isAdded", checkCartItem, cartController.checkCart);

module.exports = router;

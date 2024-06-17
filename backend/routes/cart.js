const express = require("express");
const router = express.Router();
const {
  isLoggedin,
  checkCartItem,
  deleteCheckCartItem,
  checkUserRoleLogin,
} = require("../middlewares.js");
const wrapAsync = require("../utils/wrapAsync.js");
const cartController = require("../controllers/cart.js");

//add to cart
router.get("/:id/addcart", checkCartItem, wrapAsync(cartController.addToCart));

// show cart details
router.get(
  "/cartdetails",
  checkUserRoleLogin,
  wrapAsync(cartController.showCartDetails)
);

//delete cart items
router.delete(
  "/:id",
  deleteCheckCartItem,
  wrapAsync(cartController.deleteCartItem)
);

//check item already present in cart or not
router.get("/:id/isAdded", checkCartItem, cartController.checkCart);

module.exports = router;

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const orderController = require("../controllers/order.js");
const {
  checkUserRoleLogin,
  validateOrderSchema,
} = require("../middlewares.js");

router.get("/", checkUserRoleLogin, wrapAsync(orderController.allOrderDetails));

router.post(
  "/:id",
  checkUserRoleLogin,
  validateOrderSchema,
  wrapAsync(orderController.placeOrder)
);

module.exports = router;

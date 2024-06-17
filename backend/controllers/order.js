const Order = require("../models/order");
const Item = require("../models/Item.js");
const User = require("../models/user.js");
const expressError = require("../utils/expressError.js");

module.exports.placeOrder = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Item.findById(id).catch((err) => {
      console.log("Product not found error");
      console.log(err);
    });

    if (product) {
      if (product.stock === 0) {
        res.json("ProductOutOfStock");
      } else {
        product.purchases += req.body?.quantity;
        product.profit += req.body?.price;
        product.stock -= req.body?.quantity;
        let updatedItem = await product.save();
        let order = new Order(req.body);
        order.productDetail = updatedItem;
        order.customerDetail = req.user._id;
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");

        const orderDateString = `${year}-${month}-${day}`;
        const orderDate = new Date(orderDateString);

        order.date = orderDate;
        let savedOrder = await order.save();
        let user = await User.findById(req.user._id).catch((err) => {
          console.log("user not found error");
          console.log(err);
          res.json("You must login");
        });
        user.orders.push(savedOrder);
        await user.save();
        res.json("ordered");
      }
    } else if (!product) {
      res.json("itemNotFound");
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.allOrderDetails = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate({
      path: "orders",
      populate: { path: "productDetail" },
    });
    res.json(user.orders);
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

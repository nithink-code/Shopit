const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productDetail: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  customerDetail: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

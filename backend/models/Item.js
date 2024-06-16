const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Retailer",
  },
  purchases: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 1,
  },
});

let Item = mongoose.model("Item", itemSchema);

module.exports = Item;

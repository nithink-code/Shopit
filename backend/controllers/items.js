const Item = require("../models/Item.js");
const User = require("../models/user.js");
const Retailer = require("../models/retailer.js");
const Order = require("../models/order.js");
const expressError = require("../utils/expressError.js");

module.exports.getHomePage = async (req, res) => {
  try {
    let data = await Item.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.createItem = async (req, res) => {
  try {
    let newItem = new Item(req.body);
    newItem.image = req.file.path;
    let retailer = await Retailer.findById(req.user._id).catch((err) => {
      console.log(err);
      res.json("You need to login");
    });
    if (retailer) {
      newItem.owner = req.user._id;
      retailer.products.push(newItem);
      await retailer.save().catch((err) => {
        console.log(err);
      });
      await newItem.save().then((data) => {
        res.json(data);
      });
    } else {
      res.json("Retailer not found");
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.showItem = async (req, res) => {
  try {
    let { id } = req.params;

    let item = await Item.findById(id)
      .populate("owner")
      .catch((err) => {
        console.log("item not found error");
      });

    if (!item) {
      console.log("item not found");
      res.json("itemNotFound");
    } else {
      res.json(item);
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.editItem = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, price, description } = req.body;
    let editItem;
    if (req.file?.path) {
      editItem = await Item.findByIdAndUpdate(id, {
        name: name,
        price: price,
        description: description,
        image: req.file.path,
      }).catch((err) => {
        console.log("edit error");
        console.log(err);
      });
    } else {
      editItem = await Item.findByIdAndUpdate(id, req.body).catch((err) => {
        console.log("edit error");
      });
    }

    if (!editItem) {
      res.json("noItemFound");
    } else {
      res.json(editItem);
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    let { id } = req.params;
    let item = await Item.findByIdAndDelete(id).catch((err) => {
      console.log("delete Item Error");
    });
    if (!item) {
      res.json("itemNotFound");
    } else {
      let retailer = await Retailer.findByIdAndUpdate(req.user._id, {
        $pull: { products: id },
      }).catch((err) => {
        console.log(err);
      });
      if (retailer) {
        let deletedOrders = await Order.find({ productDetail: id });
        let deletedOrderIds = deletedOrders.map((order) => order._id);
        await User.updateMany({
          $pull: {
            cart: id,
            orders: { $in: deletedOrderIds },
          },
        });
        await Order.deleteMany({ productDetail: id });
        res.json("deleted");
      } else {
        res.json("notRetailer");
      }
    }
  } catch (err) {
    console.log(err);
    throw new expressError(500, err);
  }
};

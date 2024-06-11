const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const retailerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      default: [],
    },
  ],
  role: {
    type: String,
    default: "retailer",
  },
});

retailerSchema.plugin(passportLocalMongoose);

const Retailer = mongoose.model("Retailer", retailerSchema);

module.exports = Retailer;

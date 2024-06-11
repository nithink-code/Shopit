const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      default: [],
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      default: [],
    },
  ],
  role: {
    type: String,
    default: "customer",
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const User = require("./models/user.js");
const Retailer = require("./models/retailer.js");
const itemsRouter = require("./routes/items.js");
const usersRouter = require("./routes/users.js");
const cartRouter = require("./routes/cart.js");
const retailerRouter = require("./routes/retailer.js");
const orderRouter = require("./routes/order.js");
const { findUserRole, loginFormIsLoggedIn } = require("./middlewares.js");
const wrapAsync = require("./utils/wrapAsync.js");

const port = 8080;

const DB_URL = "mongodb://127.0.0.1:27017/shopit";

main()
  .then(console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

const sessionOptions = {
  secret: "MySecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(bodyParser.json());
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use("user", new localStrategy(User.authenticate()));
passport.use("retailer", new localStrategy(Retailer.authenticate()));

passport.serializeUser(function (entity, done) {
  done(null, { id: entity._id, type: entity.role });
});

passport.deserializeUser(function (obj, done) {
  switch (obj.type) {
    case "customer":
      User.findById(obj.id).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(new Error("user id not found:" + obj.id, null));
        }
      });
      break;
    case "retailer":
      Retailer.findById(obj.id).then((retailer) => {
        if (retailer) {
          done(null, retailer);
        } else {
          done(new Error("retailer id not found:" + obj.id, null));
        }
      });
      break;
    default:
      done(new Error("no entity type:", obj.type), null);
      break;
  }
});

app.get("/api/getUserRole", findUserRole, (req, res) => {
  res.json({ role: undefined });
});

app.get(
  "/api/loginForm/isLoggedIn",
  loginFormIsLoggedIn,
  wrapAsync((req, res) => {
    res.json("LoggedIn");
  })
);

app.use("/api/items", itemsRouter); //items route
app.use("/", usersRouter); //auth and authori route
app.use("/api/items/cart", cartRouter); //cart route
app.use("/api/retailer", retailerRouter); //retailer route
app.use("/api/order/item", orderRouter); //order route

app.use((err, req, res, next) => {
  if (err) {
    let { statusCode, errmsg } = err;
    console.log("error middleware");
    console.log(err);
    console.log(`${statusCode} , ${errmsg}`);
    res.status(statusCode).send(errmsg);
  } else {
    next();
  }
});

app.listen(port, (req, res) => {
  console.log(`App is listening on port ${port}`);
});

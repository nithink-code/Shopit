if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
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
const MongoStore = require("connect-mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Handle preflight requests for all routes
// app.options("*", cors(corsOptions));

const app = express();

// app.use(cors(corsOptions));

const port = 8080;

const DB_URL = process.env.DB_URL;

main()
  .then(console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error occured in mongo session store", err);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

var whitelist = ["https://shopit-five.vercel.app"];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) === -1) {
      callback(new Error("Not allowed by CORS"));
    } else {
      callback(null, true);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
};

// app.use(bodyParser.json());

app.use(cookieParser());
app.use(session(sessionOptions));

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
//   credentials: true,
// };

// app.options("*", cors(corsOptions));

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

app.get("/", (req, res) => {
  res.json("Success");
});

app.get("/api/getUserRole", findUserRole, (req, res) => {
  res.json({ role: undefined });
});

app.get("/api/loginForm/isLoggedIn", loginFormIsLoggedIn, (req, res) => {
  res.json("LoggedIn");
});

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

const express = require("express");
const router = express.Router();
const {
  validateItemSchema,
  validateItemSchema2,
  isLoggedin,
  isOwner,
  UserRole,
  checkUserRoleLoginForRetailer,
} = require("../middlewares.js");
const wrapAsync = require("../utils/wrapAsync.js");
const itemsController = require("../controllers/items.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//home page
router.get("/", wrapAsync(itemsController.getHomePage));

//create item
router.post(
  "/",
  isLoggedin,
  UserRole,
  upload.single("image"),
  (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body)); // Ensure req.body is populated
    next();
  },
  validateItemSchema,
  wrapAsync(itemsController.createItem)
);

//show route
router.get("/:id", isLoggedin, wrapAsync(itemsController.showItem));

//edit route
router.put(
  "/:id",
  isLoggedin,
  isOwner,
  upload.single("image"),
  (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body)); // Ensure req.body is populated
    next();
  },
  validateItemSchema2,
  wrapAsync(itemsController.editItem)
);

//delete route
router.delete(
  "/:id",
  checkUserRoleLoginForRetailer,
  isOwner,
  wrapAsync(itemsController.deleteItem)
);

module.exports = router;

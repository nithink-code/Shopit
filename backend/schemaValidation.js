let Joi = require("joi");
const passport = require("passport");

module.exports.itemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required().max(500),
  stock: Joi.number().min(0).required(),
});

module.exports.itemSchema2 = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(1),
  description: Joi.string().required().max(500),
  image: Joi.string().required(),
  stock: Joi.number().required().min(1),
});

module.exports.orederSchema = Joi.object({
  quantity: Joi.number().required().min(1),
  price: Joi.number().required().min(1),
  deliveryCharge: Joi.number().required().min(1),
  total: Joi.number().required().min(1),
});

module.exports.signUpFormValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.loginFormValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

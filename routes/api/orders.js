const express = require("express");
const router = express.Router();
const passport = require("passport");
//load validation
const validateOrderInput = require("../../validation/order");
const Order = require("../../models/Order");

//@route GET api/orders/test
//@desc Test Orders
//@access Public
router.get("/test", (req, res) => res.send("Orders Wokring"));

//@route GET api/orders/all
//@desc get all Orders
//@access For Admin Only
router.get("/all", (req, res) => {
  Order.find({}, orders => {
    var ordermap = [];
    var i = 0;
    orders.forEach(order => {
      ordermap[i++] = order;
    });
    res.json(ordermap);
  });
});

//@route POST api/orders/
//@desc Insert an Orders
//@access For User
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrderInput(req.body);
    //Check validation
    if (!isValid)
      //not valid
      return res.status(400).json(errors);
    //Get Fields
    newOrder = {
      user: req.user,
      address: req.body.address,
      phone: req.body.phone,
      bill: req.body.bill,
      products: req.body.products
    };

    new Order(newOrder).save().then(order => res.json(order));
  }
);

module.exports = router;

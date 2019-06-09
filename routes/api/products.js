const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
//loading validation
const validateProductInput = require("../../validation/product");
//@route GET api/products/test
//@desc Test Products
//@access Public
router.get("/test", (req, res) => res.send("Products Wokring"));

//@route GET api/products/all
//@desc Get all the Products
//@access Public
router.get("/all", (req, res) => {
  Product.find({}, (err, products) => {
    if (!products)
      return res
        .status(404)
        .json({ product: "There is no product in the database" });
    res.json(products);
    //var productmap = [];
    //var i = 0;
    //console.log(products);
    //products.forEach(product => {
    //  productmap = product;
    //});
    //console.log(productmap);
  });
});

///@router GET api/product/:id
//@desc Get Product by ID
//@access Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .sort({ date: -1 })
    .then(product => res.json(product))
    .catch(err => {
      res
        .status(404)
        .json({ noproductfound: "There is no product against this ID" });
    });
});

//@route POST api/products/add
//@desc add Product
//@access For Admin only
router.post("/", (req, res) => {
  const { errors, isValid } = validateProductInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Product.findOne({ name: req.body.name })
    .then(product => {
      if (product) {
        errors.productexist = "Prodcut already exists (try changing the name)";
        res.status(400).json(errors);
      } else {
        //if product doesnt exists
        const productFields = {};
        if (req.body.name) productFields.name = req.body.name;
        if (req.body.price) productFields.price = req.body.price;
        if (req.body.description)
          productFields.description = req.body.description;
        if (req.body.quantity) productFields.quantity = req.body.quantity;
        new Product(productFields).save().then(product => res.json(product));
      }
    })
    .catch(err => res.json(err));
});

//@route DELETE api/products/:id
//@desc delete the product by id
//@access For Admin only
router.delete("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.remove().then(() => res.json({ success: "true" }));
    })
    .catch(err =>
      res
        .status(404)
        .json({ noproductfound: "There is no product against this ID" })
    );
});

module.exports = router;

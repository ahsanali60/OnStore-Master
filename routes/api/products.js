const express = require("express");
const router = express.Router();

//@route GET api/products/test
//@desc Test Products
//@access Public
router.get("/test", (req, res) => res.send("Products Wokring"));

module.exports = router;

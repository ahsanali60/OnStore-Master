const express = require("express");
const router = express.Router();

//@route GET api/orders/test
//@desc Test Orders
//@access Public
router.get("/test", (req, res) => res.send("Orders Wokring"));

module.exports = router;

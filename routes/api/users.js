const express = require("express");
const router = express.Router();

//@route GET api/users/test
//@desc Test User
//@access Public
router.get("/test", (req, res) => res.send("users Wokring"));

module.exports = router;

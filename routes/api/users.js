const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const keys = require("../../config/keys");
//load validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Loading models
const User = require("../../models/User");

//@route GET api/users/test
//@desc Test User
//@access Public
router.get("/test", (req, res) => res.send("users Wokring"));

//@route POST api/users/register
//@desc Register the User
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //there is a user
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    } //end else
  }); //end findOne
}); //end register request

//@route POST api/users/login
//@desc Login the User
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //findUser
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //check for password
    else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //password is correct

          const payload = { id: user.id, name: user.name };
          //assign the JWT
          console.log(keys.secretOrkey);
          jwt.sign(
            payload,
            keys.secretOrkey,
            { expiresIn: "48h" },
            (err, token) => {
              res.json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          errors.password = "Password incorrect";
          res.status(400).json(errors);
        }
      });
    } //end else
  });
}); //end POST  of login request

//@route POST api/users/current
//@desc Return the Logged in User
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);
module.exports = router;

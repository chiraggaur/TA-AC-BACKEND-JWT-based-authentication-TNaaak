var express = require("express");
var router = express.Router();
var User = require("../models/users");

/* GET users listing. */
router.post("/register", async function (req, res, next) {
  var user = await User.create(req.body);
  console.log(user);
  res.status(200).json(user);
});
router.post("/login", async function (req, res, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email or Password is empty" });
  }
  var user = await User.findOne({ email });
  try {
    if (!user) {
      res.status(400).json({ error: "Email not registered" });
    }
    //if user found then verify password
    var result = user.verifypassword(password);
    if (!result) {
      res.status(400).json({ error: "Email not registered" });
    }
    // generate token
    var token = await user.signToken();
    res.json({ user: user.userJSON(token) });
  } catch (err) {
    next(err); // doubt
  }
});

module.exports = router;

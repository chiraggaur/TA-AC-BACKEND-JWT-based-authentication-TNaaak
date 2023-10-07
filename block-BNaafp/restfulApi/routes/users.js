var express = require("express");
var router = express.Router();
var User = require("../models/users");
/* GET home page. */
router.post("/register", async function (req, res, next) {
  try {
    var user = await User.create(req.body);
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});
router.post("/login", async function (req, res, next) {
  var { email, password } = req.body;
  // if email or password field empty
  if (!email || !password) {
    res.status(400).json({ error: "Email/password required" });
  }

  try {
    var user = await User.findOne({ email }); // either null or result with actual user

    // 3 possibilites above 1. if email not registered,2.if password wrong or error occured 3.
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }
    // when user is found
    var result = await user.verifypassword(password);
    console.log(user, result);
    // if false eg: wrong password input
    // if (!result) {
    //   return res.status(400).json({ error: "Invalid password" });
    // }
    // now create token because there is valid user and password ater handling all checks
  } catch (error) {
    next(error); // if any type of error occured eg: server side
  }
});

module.exports = router;

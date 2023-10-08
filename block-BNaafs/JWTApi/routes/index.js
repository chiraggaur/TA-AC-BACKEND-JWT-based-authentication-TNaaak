var express = require("express");
var router = express.Router();
var auth = require("../middlweares/auth");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/dashboard", auth.verifyToken, function (req, res, next) {
  res.send("token matched user is accessible ");
});

module.exports = router;

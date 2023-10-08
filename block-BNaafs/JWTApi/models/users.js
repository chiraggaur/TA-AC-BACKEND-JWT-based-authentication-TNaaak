var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

//methods
// while registering pre save for incryting pass
usersSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    await bcrypt.hash(this.password, 10).then((hashed) => {
      this.password = hashed;
    });
    next(); // forward to next middle ware middleware
  }
});

// while login verify password

usersSchema.methods.verifypassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    next(err);
  }
};
// create token method
usersSchema.methods.signToken = async function () {
  var payload = { userId: this.id, email: this.email };
  try {
    var token = await jwt.sign(payload, "thisissecreat");
    return token;
  } catch (err) {
    next(err);
  }
};

// userJson limited data with generated token inside

usersSchema.methods.userJSON = function (token) {
  return {
    name: this.name,
    email: this.email,
    token: token,
  };
};

var Mymodel = mongoose.model("User", usersSchema);
module.exports = Mymodel;

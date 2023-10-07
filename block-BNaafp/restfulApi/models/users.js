var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

// hash passowrd before saving to db at time of register
usersSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    // this.password = await bcrypt.hash(this.Password, 10);
    await bcrypt.hash(this.password, 10).then(function (hash) {
      // Store hash in your password DB.
      this.password = hash;
    });
  }
  next();
});

// compare normal password to hash at time of login
usersSchema.methods.verifypassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    next(error);
  }
};
var Mymodel = mongoose.model("USER", usersSchema);

module.exports = Mymodel;

var jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (req, res, next) => {
    var token = req.headers.authorization;
    // console.log(token);
    try {
      var payload = await jwt.verify(token, "thisissecreat");
      console.log(payload);
      req.user = payload;
      next(); // now user is accecible in next request
    } catch (err) {
      next(err);
    }
  },
};

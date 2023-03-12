const jwt = require("jsonwebtoken");
const config = require("config");
const dotenv = require("dotenv");
const jwtConfig = config.get("jwtConfig");
dotenv.config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  const cookie = req.cookies ? req.cookies[jwtConfig.cookiesName] : null

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  if(token === cookie){
    next();
  }

  res.status(401).json({ msg: "Token invalid" });
};

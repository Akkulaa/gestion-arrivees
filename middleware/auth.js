require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    bearer = bearerHeader.split(':');
    bearerToken = bearer[1];
    req.token = bearerToken;
    console.log(token);
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, 'process.env.TOKEN_SCRET');
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
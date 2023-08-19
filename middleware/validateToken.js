const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(400);
      throw new Error("token doesnt exist");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(400);
        throw new Error("token unvalid");
      }
      req.user = decoded.user;
      next();
    });
  }
  res.status(400);
  throw new Error("token doesnt exist");
});

module.exports = validateToken;

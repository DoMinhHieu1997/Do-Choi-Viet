const jwt = require("jsonwebtoken");
const { findById } = require("../database/user");

const authMdw = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(400).send("Chưa có Jwt token");
  }
  const token = bearerToken.split(" ")[1];
  jwt.decode(token, "MY_PRIVATE_KEY", async (err, decodedInfo) => {
    if (err) {
      res.status(401).send("Token không phù hợp");
    } else {
      const user = await findById(decodedInfo.userId);
      req.user = user;
      next();
    }
  });
};

module.exports = { authMdw };
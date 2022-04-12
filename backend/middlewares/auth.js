const jwt = require("jsonwebtoken");

const authMdw = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(400).send("Chưa có Jwt token");
  }
  const token = bearerToken.split(" ")[1];
  jwt.decode(token, "MY_PRIVATE_KEY", (err, decodedInfo) => {
    if (err) {
      res.status(401).send("Token không phù hợp");
    } else {
      console.log(decodedInfo);
      next();
    }
  });
};

module.exports = { authMdw };
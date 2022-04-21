const jwt = require("jsonwebtoken");
const { findById } = require("../database/user");
const responseMessage = require("../message");

const authMdw = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return responseMessage("fail",1,"Thực hiện thao tác không thành công");
  }
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, "MY_PRIVATE_KEY", async (err, decodedInfo) => {
    if (err) {
      return responseMessage("fail",1,"Đã hết phiên đăng nhập, mời đăng nhập lại");
    } else {
      const user = await findById(decodedInfo.userId);
      req.user = user;
      next();
    }
  });
};

module.exports = { authMdw };
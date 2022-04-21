const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findByUsername, insertUser } = require("../database/user");
const responseMessage = require("../message");

const login = async (username, password) => {
    const existedUser = await findByUsername(username);

    if (!existedUser) {
        return responseMessage("fail","1","Tài khoản không đúng");
    }

    if (!verifyPassword(password, existedUser)) {
        return responseMessage("fail","1","Mật khẩu không đúng");
    }

    const token = jwt.sign(
        {
            userId: existedUser._id
        },
        "MY_PRIVATE_KEY",
        {
            expiresIn: 60*60*24
        }
    )

    return responseMessage("success",0,{user: existedUser, token:token});
};

const register = async (username, email, password) => {
    const existedUser = await findByUsername(username);

    if (existedUser) {
        throw new Error('tài khaonr đã tồn tại!');
    }

    const { salt, hashedPassword } = encryptPassword(password);

    const insertedUser = await insertUser({
        username: username,
        email: email,
        salt: salt,
        hashedPassword: hashedPassword,
    });

    return insertedUser;
};

const encryptPassword = (password) => {
    const salt = crypto.randomBytes(128).toString("hex");

    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hashedPassword: hashedPassword,
    }
};

const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(
        password, 
        user.salt, 
        10000, 
        64, 
        "sha512")
    .toString("hex");

    return hashedPassword === user.hashedPassword;
}

module.exports = { login, register };
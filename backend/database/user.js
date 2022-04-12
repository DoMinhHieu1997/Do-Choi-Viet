const { db } = require("./");

const findByUsername = async ( username ) => {
    const user = await db.users.findOne({ username: username });
    return user;
};

const insertUser = async (user) => {
    await db.users.insertOne(user);
    return user;
}

module.exports = { findByUsername, insertUser };
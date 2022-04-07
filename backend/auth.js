const authMdw = (req, res, next) => {
    const authUser = {
        username: "hieudm"
    };

    if (authUser) {
        req.authUser = authUser;
        next();
    } else {
        res.send("User must login first!");
    }
}

module.exports = authMdw;
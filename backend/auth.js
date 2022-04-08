const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
    
    const token = jwt.sign(
        {
            username: req.body.username,
        },
        "MY_PRIVATE_KEY",
        {
            expiresIn: 5 * 60,
        }
    );
    res.send(token);
});

module.exports = router
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
            expiresIn: '24h',
        }
    );
    res.send(token);
});

module.exports = router
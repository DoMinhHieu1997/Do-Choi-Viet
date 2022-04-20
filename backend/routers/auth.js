const express = require("express");
const AuthCtrl = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const result = await AuthCtrl.login(
            req.body.username, 
            req.body.password
        );
        res.json(result);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.post("/register", async (req, res) => {
    if (!req.body.password || req.body.password.length < 6) {
        res.status(400).send('Mật khẩu cần có ít nhất 6 ký tự');
        return;
    }

    try {
        const newUser = await AuthCtrl.register(
            req.body.username, 
            req.body.email, 
            req.body.password
        );
        res.json(newUser);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
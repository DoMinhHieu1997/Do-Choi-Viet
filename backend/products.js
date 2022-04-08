const express = require("express");
const router = express.Router();
const authMdw = require("./jwt");

const products = [
    {id:1, name:"Cờ vua 2228"},
    {id:2, name:"Cờ vua 2236"},
];

router.get("/", authMdw,(req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    console.log(req.params);
    const product = products.find((p) => p.id === req.params.id);
    res.json(product);
});

router.post("/", (req, res) => {
    if (products.find( (p) => p.id === req.body.id) ) {
        throw new Error("Product is already existed");
    }
    products.push(req.body);
    res.send("OK");
});

router.delete("/add", (req, res) => {
    products.splice(2,1);
    res.send("OK");
});

module.exports = router;
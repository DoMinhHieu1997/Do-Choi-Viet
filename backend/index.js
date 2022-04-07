const express = require("express");
const productRouter = require("./products");
const authMdw = require("./auth");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/static", express.static("assets"));

app.use(authMdw);
app.use("/products",productRouter);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(5001, () => {
    console.log('App is running at 5001');
});
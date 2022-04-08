const express = require("express");
const productRouter = require("./products");
const authRouter = require("./auth");

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products",productRouter);

app.use("/static", express.static("assets"));

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(5001, () => {
    console.log('App is running at 5001');
});
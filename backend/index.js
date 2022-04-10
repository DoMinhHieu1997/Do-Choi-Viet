const express = require("express");
const { MongoClient } = require("mongodb");
const productRouter = require("./products");
const authRouter = require("./auth");

const url = "mongodb://localhost:27017";
const dbClient = new MongoClient(url);
dbClient.connect( async () => {
    console.log("MongoDB connected");
    const db = dbClient.db("do_choi_viet");
    // db.collection("products").insertOne({
    //     name:"Cờ vua phíp đen bàn gấp",
    //     size:"20*20 cm",
    //     classify:2
    // });
    const productItems = await db.collection("products").find({classify:2}).toArray();
    console.log(productItems);
});

const app = express();
app.use(express.json());

// app.use("/auth", authRouter);
// app.use("/products",productRouter);

// app.use("/static", express.static("assets"));

// app.use((err, req, res, next) => {
//     res.status(500).send(err.message);
// });

app.listen(5001, () => {
    console.log('App is running at 5001');
});
const express = require("express");
const { connectToDb } = require("./database");
const router = require("./routers");
// const ProductRouter = require("./products");

// const url = "mongodb://localhost:27017";
// const dbClient = new MongoClient(url);
// dbClient.connect( async () => {
//     console.log("MongoDB connected");
//     const db = dbClient.db("do_choi_viet");
//     // db.collection("products").insertMany(
//     //     [
//     //         {
//     //             name:"Cờ vua nam châm bàn gấp 2236",
//     //             size:"20*20 cm",
//     //             classify:2
//     //         },
//     //         {
//     //             name:"Cờ vua phíp đen bàn gấp",
//     //             size:"20*20 cm",
//     //             classify:2
//     //         },
//     //         {
//     //             name:"Cờ vua nam châm bàn gấp 2268",
//     //             size:"30*30 cm",
//     //             classify:1
//     //         },
//     //         {
//     //             name:"Cờ vua không nam châm bàn gấp 001",
//     //             size:"17*17 cm",
//     //             classify:2
//     //         },
//     //         {
//     //             name:"Cờ vua nam châm bàn gấp 2228",
//     //             size:"15*15 cm",
//     //             classify:1
//     //         },
//     //     ]
        
//     // );
//     const productItems = await db.collection("products").find({classify:2}).toArray();
//     console.log(productItems);
// });

const app = express();
app.use(express.json());

app.use(router);

connectToDb();
// app.use("/products", ProductRouter);

// app.use("/auth", authRouter);
// app.use("/products",productRouter);

// app.use("/static", express.static("assets"));

// app.use((err, req, res, next) => {
//     res.status(500).send(err.message);
// });

app.listen(5001, () => {
    console.log('App is running at 5001');
});
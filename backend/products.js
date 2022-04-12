const express = require("express");
const { db } = require("./db");
const { ObjectId } = require("mongodb");
const ProductRouter = express.Router();

//read all
ProductRouter.get("/", async (req, res) => {
    const products = await db.products.find({}).toArray();
    res.json(products);
});

//read by id
ProductRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await db.products
        .find({
            _id: ObjectId(id)
        })
        .toArray();
    res.json(product);
});

//create
ProductRouter.post("/", async (req, res) => {
    const product = {
        name: req.body.name,
        size: req.body.size,
        classify: req.body.classify
    }
    const result = await db.products.insertOne(product);
    res.json({
        insertedId: result.insertedId,
        product: product
    });
    // if (products.find( (p) => p.id === req.body.id) ) {
    //     throw new Error("Product is already existed");
    // }
    // products.push(req.body);
    // res.send("OK");
});

//update
ProductRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await db.products.updateOne(
        {
            _id: ObjectId(id)
        },
        {
            $set: {
                name: req.body.name,
                size: req.body.size,
                classify: req.body.classify
            },
            $currentDate: {
                lastModified: true,
            }
        }
    );
    res.json(result);
});

//delete
ProductRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await db.products.deleteOne({
        _id: ObjectId(id)
    });
    res.json({
        deletedId: id
    });
});

module.exports = ProductRouter;
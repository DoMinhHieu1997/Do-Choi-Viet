const express = require("express");
const router = express.Router();
const ProductCtrl = require("../controllers/ProductController");
const { authMdw } = require("../middlewares/auth");

//read all
router.get("/category/:category", async (req, res) => {
    try {
        const listProduct = await ProductCtrl.getListClassifiedProduct(
            req.params.category
        );
        res.json(listProduct);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//read by id
router.get("/:id", async (req, res) => {
    try {
        const productInfo = await ProductCtrl.getProductById(
            req.params.id
        );
        res.json(productInfo);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//create
router.post("/", authMdw, async (req, res) => {
    try {
        if (req.user) {
                const product = {
                name: req.body.name,
                size: req.body.size,
                classify: req.body.classify,
                type: req.body.type
            }
            const result = await ProductCtrl.createNewProduct(product);
            res.json(result);
        } else {
            res.json("Thêm sản phẩm không thành công");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//update
router.patch("/:id", async (req, res) => {
    try {

    } catch (err) {
        res.status(400).send(err.message);
    }
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
router.delete("/:id", authMdw, async (req, res) => {
    try {
        if (req.user) {
            const id = req.params.id;
            const result = await ProductCtrl.deleteProduct(id);
            res.json(result);
        } else {
            res.json("Xóa sản phẩm không thành công");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
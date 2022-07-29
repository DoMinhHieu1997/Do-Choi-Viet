const express = require("express");
const router = express.Router();
const ProductCtrl = require("../controllers/ProductController");
const { authMdw } = require("../middlewares/auth");
const responseMessage = require("../message");

//read all
router.get("/category/:category", async (req, res) => {
    try {
        const result = await ProductCtrl.getListClassifiedProduct(
            req.params.category
        );
        res.json(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//read by id
router.get("/detail/:id", async (req, res) => {
    try {
        const productInfo = await ProductCtrl.getProductById(
            req.params.id
        );
        res.json(productInfo);
    } catch (err) {
        res.json(responseMessage("error",1,''));
    }
});

//get random products
router.get("/suggestions", async(req, res) => {
    try {
        const randomProducts = await ProductCtrl.getRandomProducts(req.body.id);
        res.json(randomProducts);
    } catch (err) {
        console.log(err);
        res.json(responseMessage("error",1,''));
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
                type: req.body?.type,
                images: req.body?.images,
                content: req.body?.content,
                description: req.body?.description
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
router.patch("/update/:id", authMdw, async (req, res) => {
    try {
        if (req.user) {
            const forUpdate = {
                id: req.params.id,
                name: req.body.name,
                size: req.body.size,
                classify: req.body.classify,
                type: req.body?.type,
                images: req.body?.images,
                content: req.body?.content,
                description: req.body?.description
            }
            const result = await ProductCtrl.updateProduct(forUpdate);
            res.json(result);
        } else {
            res.json("Cập nhật sản phẩm không thành công");
        }
    } catch (err) {
        return responseMessage("fail",1,"Đã hết phiên đăng nhập, mời đăng nhập lại");
    }
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